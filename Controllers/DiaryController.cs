using System.Text.Json;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DiaryApp.Controllers
{
    [Authorize()]
    [Route("api/[controller]")]
    [ApiController]
    public class DiaryController : ControllerBase
    {
        private readonly DiaryDbContext _context;

        public DiaryController(DiaryDbContext context)
        {
            _context = context;
        }

        // GET: api/Diary
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Diary>>> GetDiaries(int start = 0, int count = 1)
        {
            if (_context.Diaries == null) return NotFound();

            var accessToken = await HttpContext.GetTokenAsync("access_token");
            var email = await GetUserEmail(accessToken);
            if (email == null) return NotFound();

            return await _context.Diaries.OrderByDescending(diary => diary.PublishedTimestamp)
                .Where(diary => diary.UserEmail == email)
                .Skip(start*count).Take(count)
                .ToListAsync();
        }

        // GET: api/Diary/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Diary>> GetDiary(uint id)
        {
            if (_context.Diaries == null) return NotFound();

            var accessToken = await HttpContext.GetTokenAsync("access_token");
            var email = await GetUserEmail(accessToken);
            if (email == null) return NotFound();

            var diary = await _context.Diaries.FindAsync(id);

            if (diary == null) return NotFound();

            if (diary.UserEmail != email) return Unauthorized();

            return diary;
        }

        // GET: api/Diary/count
        [HttpGet("count")]
        public async Task<ActionResult<int>> GetDiariesCount()
        {
            if (_context.Diaries == null) return NotFound();

            var accessToken = await HttpContext.GetTokenAsync("access_token");
            var email = await GetUserEmail(accessToken);
            if (email == null) return NotFound();

            return await _context.Diaries.Where(diary => diary.UserEmail == email).CountAsync();
        }


        // PUT: api/Diary/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDiary(uint id, Diary diary)
        {
            var accessToken = await HttpContext.GetTokenAsync("access_token");
            var email = await GetUserEmail(accessToken);
            if (email == null) return NotFound();

            if (diary.UserEmail != email) return Unauthorized();

            if (id != diary.Id) return BadRequest();

            _context.Entry(diary).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DiaryExists(id)) return NotFound();
                else throw;
            }

            return NoContent();
        }

        // POST: api/Diary
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Diary>> PostDiary(Diary diary)
        {
            if (_context.Diaries == null)
            {
                return Problem("Entity set 'DiaryDbContext.Diaries'  is null.");
            }

            var accessToken = await HttpContext.GetTokenAsync("access_token");
            var email = await GetUserEmail(accessToken);
            if (email == null) return NotFound();

            if (diary.UserEmail != email) return Unauthorized();

            _context.Diaries.Add(diary);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDiary", new { id = diary.Id }, diary);
        }

        // DELETE: api/Diary/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDiary(uint id)
        {
            if (_context.Diaries == null) return NotFound();

            var diary = await _context.Diaries.FindAsync(id);
            if (diary == null) return NotFound();

            var accessToken = await HttpContext.GetTokenAsync("access_token");
            var email = await GetUserEmail(accessToken);
            if (email == null) return NotFound();

            if (diary.UserEmail != email) return Unauthorized();

            _context.Diaries.Remove(diary);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DiaryExists(uint id)
        {
            return (_context.Diaries?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        private static async Task<UserProfile?> GetUser(string? token)
        {
            if (token == null) return null;
            var client = new HttpClient();
            client.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);
            var result = await client.GetStreamAsync("https://linh-nguyen.au.auth0.com/userinfo");
            return await JsonSerializer.DeserializeAsync<UserProfile>(result);
        }

        private static async Task<string?> GetUserEmail(string? token)
        {
            var user = await GetUser(token);
            if (user == null) return null;
            return user.Email;
        }
    }
}
