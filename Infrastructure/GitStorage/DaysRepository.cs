using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using Domain.Ration.RationDay;
using Infrastructure.Interfaces;

namespace Infrastructure.GitStorage
{
    public class DaysRepository : IDaysRepository
    {
        private readonly IConfiguration _configuration;

        public DaysRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public List<RationDay> GetDays()
        {
            var path = Path.Combine(_configuration.Folder, _configuration.DaysFile);
            var list = JsonUtilities.LoadJsonFrom<RationDay>(path);
            return list ?? new List<RationDay>();
        }
    }
}
