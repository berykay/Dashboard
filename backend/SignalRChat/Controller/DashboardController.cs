using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SignalRChat.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        // GET: api/<ValuesController>
        [HttpGet]
        [Route("get-config")]

        public IActionResult Config()
        {
            var json = System.IO.File.ReadAllText("./Data/dashboard.json");
            return Content(json, "application/json");
        }

        [HttpPost("update-config")]
        public IActionResult Update([FromBody] dynamic data)
        {
            System.IO.File.Delete(@"./Data/dashboard.json");
            string datas = "" + data;
            System.IO.File.WriteAllText(@"./Data/dashboard.json", datas);

            // Return a response
            var response = new { Message = "Object added successfully." };
            return Ok(JsonConvert.SerializeObject(response));
        }

        [HttpGet]
        [Route("reset-config")]
        public IActionResult Reset()
        {
            var json = System.IO.File.ReadAllText("./Data/dashboardDefault.json");
            return Content(json, "application/json");
        }
    }
}

/*
  {
    "i": "9",
    "chartType": "RadarChart",
    "name": "Cores",
    "dataType": "Percent",
    "x": 12,
    "y": 1,
    "w": 4,
    "h": 3
  },
  */