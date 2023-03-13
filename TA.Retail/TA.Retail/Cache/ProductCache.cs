using LazyCache;
using LazyCache.Providers;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TA.Retail.Cache
{
    public class ProductCache
    {
        private static IAppCache Cache;
        public static IAppCache InitResetCache()
        {
            if (Cache == null)
            {
                IAppCache cache = new CachingService();
                cache.CacheProvider.Dispose();
                var provider = new MemoryCacheProvider(
                                     new MemoryCache(
                                      new MemoryCacheOptions()));
                Cache = new CachingService(provider);
            }
            return Cache;
        }
    }
  

}
