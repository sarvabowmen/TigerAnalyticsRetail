using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TA.Retail.Models
{
    public class Product
    {
            public int Id { get; set; }
            public string Sku { get; set; }
            public string Name { get; set; }
            public decimal Price { get; set; }
            public string CurrencySymbol { get; set; } 
            public DateTime Date { get; set; }
        }
    }
