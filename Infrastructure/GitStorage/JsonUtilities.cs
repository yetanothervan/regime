using System.Collections.Generic;
using System.IO;
using Newtonsoft.Json;

namespace Infrastructure.GitStorage
{
    public static class JsonUtilities
    {
        public static List<T> LoadJsonFrom<T>(string path)
        {
            if (!File.Exists(path)) return null;
            var errorOccured = false;
            var loaded = JsonConvert.DeserializeObject<List<T>>
            (File.ReadAllText(path), new JsonSerializerSettings()
            {
                Error = (sender, args) =>
                {
                    errorOccured = true;
                    args.ErrorContext.Handled = true;
                },
            });
            if (errorOccured) return null;
            return loaded ?? new List<T>();
        }
    }
}