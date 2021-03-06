﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using AutoMapper;
using Infrastructure.GitStorage;
using Infrastructure.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using IConfiguration = Microsoft.Extensions.Configuration.IConfiguration;

namespace WebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        private const string AllowLocalHostPolicy = "_allow_localhost";

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMediatR(typeof(Startup).Assembly);
            
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddAutoMapper(typeof(GitStorageMapperProfile));

            services.AddTransient<Infrastructure.Interfaces.IConfiguration, Infrastructure.Configuration.Configuration>();
            services.AddTransient<IIngredientsRepository, IngredientsRepository>();
            services.AddTransient<IIngredientsManager, IngredientsManager>();
            services.AddTransient<IDishesRepository, DishesRepository>();
            services.AddTransient<IDishesManager, DishesManager>();
            services.AddTransient<IMealTypesRepository, MealTypesRepository>();
            services.AddTransient<IMealTypesManager, MealTypesManager>();
            services.AddTransient<IDaysRepository, DaysRepository>();
            services.AddTransient<IDaysManager, DaysManager>();

            services.AddCors(options =>
                options.AddPolicy(AllowLocalHostPolicy, builder => { builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin(); }));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(AllowLocalHostPolicy);
            app.UseMvc();
        }
    }
}
