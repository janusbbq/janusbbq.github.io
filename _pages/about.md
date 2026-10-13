---
layout: about
title: home
permalink: /
subtitle: MS Electrical Engineering @ UT Knoxville | Power Systems | Substations & Distribution | AI for Grid Analysis

profile:
  align: right
  image: prof_pic_jian.jpg
  image_circular: false # crops the image to make it circular
  more_info: >
    <p>Knoxville, TN</p>
    <p>CURENT, The University of Tennessee</p>
    <p><a href="mailto:jhan33@vols.utk.edu">jhan33@vols.utk.edu</a></p>

selected_papers: true # includes a list of papers marked as "selected={true}"
social: true # includes social icons at the bottom of the page

announcements:
  enabled: true # includes a list of news items
  scrollable: true # adds a vertical scroll bar if there are more than 3 news items
  limit: 5 # leave blank to include all the news in the `_news` folder

latest_posts:
  enabled: false
  scrollable: true # adds a vertical scroll bar if there are more than 3 new posts items
  limit: 3 # leave blank to include all the blog posts
---

<p class="hero-statement">Eight years building and running the grid at State Grid, now turning that field experience into rigorous, verifiable tools for power-system analysis.</p>

<div class="hero-facts">
  <div><span class="hero-fact-num">8 yrs</span><span class="hero-fact-label">utility experience, State Grid</span></div>
  <div><span class="hero-fact-num">5</span><span class="hero-fact-label">35–110kV substation projects: installation &amp; commissioning</span></div>
  <div><span class="hero-fact-num">7,000+</span><span class="hero-fact-label">annual fault work orders analyzed</span></div>
  <div><span class="hero-fact-num">NAPS 2026</span><span class="hero-fact-label">distribution resilience paper</span></div>
</div>

## Featured work

<div class="projects featured-projects">
  <div class="row row-cols-1 row-cols-md-2">
    {% assign featured_projects = site.projects | where: "featured", true | sort: "importance" %}
    {% for project in featured_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
</div>

Now: MS in Electrical Engineering at UT Knoxville (expected Dec 2027), researching AI-assisted grid analysis with CURENT. See all [projects](/projects/), [writing](/blog/), or [about me](/about/).

<script type="module" src="{{ '/assets/js/power-grid-hero.js' | relative_url }}"></script>
<script src="{{ '/assets/js/contact.js' | relative_url }}"></script>
