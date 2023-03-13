using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TA.Retail.Models;
using CsvHelper;
using System.IO;
using System.Globalization;
using TA.Retail.Cache;
using LazyCache;

namespace TA.Retail.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        public StoreController()
        { 
        }

        [HttpPost]
        [Route("pricing/bulk")]
        public async Task<IActionResult> SeedPricingData([FromForm] IFormFile files)
        {
            if (files == null)
                return BadRequest("Please upload a csv file");

            if (!files.FileName.EndsWith(".csv"))
                return BadRequest("Please upload only csv files");


            string fileName = Path.GetFileName(files.FileName);

            var path =Path.Combine( Environment.CurrentDirectory , "Uploads");

            try
            {
                using (FileStream stream = new FileStream(Path.Combine(path, fileName), FileMode.Create))
                {
                    files.CopyTo(stream);
                }

            }
            catch (Exception e)
            {
                Console.WriteLine( e.Message);
                throw;
            }
            
                return Ok();


            ///return Ok($"Received file {file.FileName} with size in bytes {file.Length}");
        }

        [HttpGet]
        [Route("pricing/all")]
        public async Task<IActionResult> GetAllPrices()
        {
            List<Product> products = new List<Product>();

            IAppCache cache = ProductCache.InitResetCache();
            var productList = cache.GetOrAdd<List<Product>>("All", () =>
            {
                List<Product> products = new List<Product>();
                var path = Path.Combine(Environment.CurrentDirectory, "Uploads");
                using (var reader = new StreamReader(Path.Combine(path, "PriceFeeds.csv")))
                {
                    var csv = new CsvReader(reader, CultureInfo.InvariantCulture);

                    products = csv.GetRecords<Product>().ToList();
                }
                return products;
            });
            return Ok(productList);
        }

        [HttpPost]
        [Route("product")]
        public async Task<IActionResult> UpdateProduct(List<Product> products)
        {
            IAppCache cache = ProductCache.InitResetCache();
            cache.Add("All", products);
            using (var csv = new CsvWriter(Console.Out, CultureInfo.InvariantCulture))
            {
                csv.WriteRecords(products);
            }

            return Ok();
        }

        [HttpPost]
        [Route("pricing/search")]
        public async Task<IActionResult> SearchProduct([FromQuery] int id, [FromQuery] string name, [FromQuery] DateTime  fromDateTime, [FromQuery] DateTime toDateTime, string sku)
        {
            IAppCache cache = ProductCache.InitResetCache();
           var productList = cache.GetOrAdd<List<Product>>("All", () =>
            {
                List<Product> products = new List<Product>();
                var path = Path.Combine(Environment.CurrentDirectory, "Uploads");
                using (var reader = new StreamReader(Path.Combine(path, "PriceFeeds.csv")))
                {
                    var csv = new CsvReader(reader, CultureInfo.InvariantCulture);

                    products = csv.GetRecords<Product>().ToList();
                }
                return products;
            });
            var predicate = PredicateBuilder.True<Product>();

            if (id > 0)
            {
                predicate = predicate.And(i => i.Id == id);
            }
            if (!string.IsNullOrEmpty(name))
            {
                predicate = predicate.And(i => i.Name == name);
            }
            if (fromDateTime != DateTime.MinValue && toDateTime != DateTime.MinValue)
            {
                predicate = predicate.And(i => i.Date > fromDateTime && i.Date < toDateTime);
            }
            if (!string.IsNullOrEmpty(sku))
            {
                predicate = predicate.And(i => i.Sku == sku);
            }

            var filter = productList.AsQueryable().Where(predicate);

            return Ok(filter);
        }
    }
}
