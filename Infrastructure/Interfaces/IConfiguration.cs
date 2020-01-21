using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Interfaces
{
    public interface IConfiguration
    {
        string Folder { get; }
        string IngredientsFile { get; }
    }
}
