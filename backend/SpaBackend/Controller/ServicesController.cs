using Microsoft.AspNetCore.Mvc;

namespace SpaBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServicesController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetServices()
        {
            var services = new[]
            {
                new { Id = 1, Name = "Facial Treatment", Description = "Cleansing, exfoliation, and hydration.", Duration = "45 min", Price = 150, Image = "/services/facial.jpg" },
                new { Id = 2, Name = "Full Body Massage", Description = "Focus on muscle tension relief.", Duration = "120 min", Price = 500, Image = "/services/full-body.jpg" },
                new { Id = 3, Name = "Head Massage", Description = "Relaxing hair wash and head massage.", Duration = "60 min", Price = 200, Image = "/services/head-massage.jpg" },
                new { Id = 4, Name = "Aromatherapy Massage", Description = "Relaxation with essential oils.", Duration = "60 min", Price = 400, Image = "/services/aromatherapy.jpg" }
            };

            return Ok(services);
        }
    }
}