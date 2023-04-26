using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SignalRChat.Hubs;

namespace SignalRChat
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddSignalR();
            services.AddGrpc();
            services.AddSingleton(new RouteGuideServicer());
            services.AddMvcCore()
       .AddApiExplorer();
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builder =>
                 builder.WithOrigins("http://localhost:3000")
                 .AllowAnyMethod()
                 .AllowAnyHeader()
                 .AllowCredentials());
            });


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseCors("CorsPolicy");
            app.UseRouting();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {

                //endpoints.MapSwagger();
                endpoints.MapControllers();
                //endpoints.MapGrpcService<RouteGuideServicer>();

                /*endpoints.MapGet("/", async context =>
               {
                   app.ApplicationServices.GetService<RouteGuideServicer>();
                   //await RouteGuideServicer.DefsAsync();
                   //await context.Response.WriteAsync("Communication with gRPC endpoints must be made through a gRPC client. To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909");
               });
                */

                endpoints.MapHub<ChatHub>("/chatHub");
            });
        }
    }
}