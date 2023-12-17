using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace DiaryApp;

public partial class DiaryDbContext : DbContext
{
    public DiaryDbContext()
    {
    }

    public DiaryDbContext(DbContextOptions<DiaryDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Diary> Diaries { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Diary>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("Diary");

            entity.Property(e => e.Content).HasColumnType("text");
            entity.Property(e => e.CreatedTimestamp)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp");
            entity.Property(e => e.PublishedTimestamp).HasColumnType("timestamp");
            entity.Property(e => e.Title).HasMaxLength(255);
            entity.Property(e => e.UserEmail).HasMaxLength(255);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
