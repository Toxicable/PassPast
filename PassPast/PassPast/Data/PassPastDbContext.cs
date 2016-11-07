using PassPast.Data.DataModels;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace PassPast.Data
{
    public class PassPastDbContext : DbContext
    {
        //dont change the contructor base, it's your conenction string to the DB
        public PassPastDbContext() : base("DefaultConnection")
        {
        }

        //add in DB tables here, use the same format as the one below
        // public DbSet<TableModelClass> TableName {get; set;}
        public DbSet<Course> Courses { get; set; }
        public DbSet<Exam> Exams { get; set; }
        public DbSet<Paper> Papers { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Answer> Answers { get; set; }
		public DbSet<Comment> Comments { get; set; }
		public DbSet<User> Users { get; set; }

		//After changing the Above tables or adding/deleting a table you want to update the database to reflect your changes
		//open up Tools menu, Click NuGet Package Manager, Click Package Manager Console
		//this will open a CLI window, in this window Type: update-database


		//Ignore this here you will ony need to add tables above this
		protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            modelBuilder.Entity<User>().HasMany(x => x.AnswersCreated).WithOptional(x => x.CreatedBy);
            modelBuilder.Entity<User>().HasMany(x => x.CommentsCreated).WithOptional(x => x.CreatedBy);

        }
        

    }
}