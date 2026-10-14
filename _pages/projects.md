---
layout: page
title: projects
permalink: /projects/
description: graduate research at UT Knoxville and engineering projects from eight years at State Grid.
nav: true
nav_order: 2
display_categories: [research, software, industry]
horizontal: false
---

Two kinds of work: graduate research at UT Knoxville (2026 – present), and engineering projects from eight years at State Grid Zhejiang Hangzhou Fuyang Power Supply Co. (2010 – 2018). The table summarizes my role and the main result of each; the cards below link to the full write-ups with figures.

| Project                                                                         | My role                                            | Key result                                                                                                                                                                 |
| ------------------------------------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [LLM-for-AMS](/projects/1_project/) · 2026 – present                            | Developer, CURENT LTB research                     | Python scenario automation for AMS studies; on PJM 5-bus RTED load growth, found where line and generator constraints bind (max LMP at Bus 2 rose from about 0.25 to 1.16) |
| [PV-Curve Agent](/projects/2_project/) · 2026                                   | Developer, CURENT LTB research                     | PV/nose-curve studies run from natural-language requests, reporting load margin and nose-point voltage                                                                     |
| [Extreme-weather distribution resilience](/projects/3_project/) · NAPS 2026     | Co-author (technical review and paper preparation) | Topology-aware framework; the 10%-probability rain track caused the largest impact (21 buses, 4.11 MWh ENS)                                                                |
| [Storm prediction and grid exposure](/projects/8_project/) · 2026               | Individual course project (COSC 526)               | DYAMOND GEOS pipeline; logistic regression F1 0.712 for next-day storm prediction; Southeast grid-priority ranking                                                         |
| [Substation construction and commissioning](/projects/5_project/) · 2010 – 2012 | Substation Maintenance Technician                  | Installed, tested, and commissioned equipment on three 110kV and two 35kV substation projects                                                                              |
| [Distribution automation and reliability](/projects/6_project/) · 2015 – 2018   | Electronic Information Technician                  | Evaluation of 7,000+ annual fault work orders: fault-repair response time from 57 to 36.9 min (about 35%)                                                                  |
| [Switching-station environmental monitoring](/projects/7_project/) · 2015       | Electronic Information Technician                  | IoT and cloud monitoring of SF6, temperature, humidity, smoke, and oxygen in 10kV switching stations                                                                       |
| [PMS system data interface](/projects/4_project/) · 2018                        | Electronic Information Technician                  | Data interfaces integrating real-time data, records, and fault logs                                                                                                        |

<!-- pages/projects.md -->
<div class="projects">
{% if site.enable_project_categories and page.display_categories %}
  <!-- Display categorized projects -->
  {% for category in page.display_categories %}
  <a id="{{ category }}" href=".#{{ category }}">
    <h2 class="category">{{ category }}</h2>
  </a>
  {% assign categorized_projects = site.projects | where: "category", category %}
  {% assign sorted_projects = categorized_projects | sort: "importance" %}
  <!-- Generate cards for each project -->
  {% if page.horizontal %}
  <div class="container">
    <div class="row row-cols-1 row-cols-md-2">
    {% for project in sorted_projects %}
      {% include projects_horizontal.liquid %}
    {% endfor %}
    </div>
  </div>
  {% else %}
  <div class="row row-cols-1 row-cols-md-3">
    {% for project in sorted_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
  {% endif %}
  {% endfor %}

{% else %}

<!-- Display projects without categories -->

{% assign sorted_projects = site.projects | sort: "importance" %}

  <!-- Generate cards for each project -->

{% if page.horizontal %}

  <div class="container">
    <div class="row row-cols-1 row-cols-md-2">
    {% for project in sorted_projects %}
      {% include projects_horizontal.liquid %}
    {% endfor %}
    </div>
  </div>
  {% else %}
  <div class="row row-cols-1 row-cols-md-3">
    {% for project in sorted_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
  {% endif %}
{% endif %}
</div>
