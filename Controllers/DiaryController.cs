using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DiaryApp.Controllers
{
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
        public async Task<ActionResult<IEnumerable<Diary>>> GetDiaries(int start=0, int count=1)
        {
          if (_context.Diaries == null)
          {
              return NotFound();
          }
            var countEntry = GetDiariesCount().Result.Value;
            var end = countEntry - start*count;
            return await _context.Diaries.OrderByDescending(diary => diary.Id)
                .Where(diary => diary.Id <=end && diary.Id>end-count)
                .ToListAsync();
        }

        // GET: api/Diary/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Diary>> GetDiary(uint id)
        {
          if (_context.Diaries == null)
          {
              return NotFound();
          }
            var diary = await _context.Diaries.FindAsync(id);

            if (diary == null)
            {
                return NotFound();
            }

            return diary;
        }

        // GET: api/Diary/count
        [HttpGet("count")]
        public async Task<ActionResult<int>> GetDiariesCount()
        {
            if (_context.Diaries == null)
            {
                return NotFound();
            }
            return await _context.Diaries.CountAsync();
        }

        // PUT: api/Diary/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDiary(uint id, Diary diary)
        {
            if (id != diary.Id)
            {
                return BadRequest();
            }

            _context.Entry(diary).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DiaryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
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
            _context.Diaries.Add(diary);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDiary", new { id = diary.Id }, diary);
        }

        // DELETE: api/Diary/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDiary(uint id)
        {
            if (_context.Diaries == null)
            {
                return NotFound();
            }
            var diary = await _context.Diaries.FindAsync(id);
            if (diary == null)
            {
                return NotFound();
            }

            _context.Diaries.Remove(diary);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DiaryExists(uint id)
        {
            return (_context.Diaries?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
