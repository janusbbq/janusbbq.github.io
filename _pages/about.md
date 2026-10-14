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
  enabled: false # replaced by the milestones timeline below
  scrollable: true # adds a vertical scroll bar if there are more than 3 news items
  limit: 5 # leave blank to include all the news in the `_news` folder

latest_posts:
  enabled: false
  scrollable: true # adds a vertical scroll bar if there are more than 3 new posts items
  limit: 3 # leave blank to include all the blog posts
---

<p class="hero-statement">Eight years at State Grid, from substation construction and commissioning to distribution automation, now turning that field experience into rigorous, verifiable tools for power-system analysis.</p>

<div class="hero-facts">
  <div><span class="hero-fact-num">8 yrs</span><span class="hero-fact-label">at State Grid as a substation maintenance and electronic information technician</span></div>
  <div><span class="hero-fact-num">5</span><span class="hero-fact-label">substation projects (35–110kV): installation &amp; commissioning</span></div>
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

## Milestones

<ol class="milestones">
  <li><span class="ms-date">2026</span><span class="ms-text">Co-authored the NAPS 2026 paper on topology-aware assessment of extreme-weather impacts on distribution-system resilience (CURENT, UT Knoxville).</span></li>
  <li><span class="ms-date">2026</span><span class="ms-text">Research with CURENT LTB: LLM-for-AMS simulation automation and the PV-Curve Agent for voltage stability.</span></li>
  <li><span class="ms-date">2026</span><span class="ms-text">Storm prediction and grid-resilience exposure mapping from DYAMOND GEOS climate data (COSC 526).</span></li>
  <li><span class="ms-date">2025</span><span class="ms-text">MS in Computer Science, Northeastern University; Software Engineer Intern at IpserLab (Jan – May).</span></li>
  <li><span class="ms-date">2024</span><span class="ms-text">AWS Academy Cloud Architecting certification.</span></li>
  <li><span class="ms-date">2021</span><span class="ms-text">BBA in Accounting, The University of Winnipeg; Dean's Honour List (2020, 2022).</span></li>
  <li><span class="ms-date">2018</span><span class="ms-text">Evaluated Fuyang's distribution automation from 7,000+ annual fault work orders: fault-repair response time down about 35%.</span></li>
  <li><span class="ms-date">2016</span><span class="ms-text">Awarded the Electrical Engineer professional title (State Grid Corporation of China); GIS-based urban distribution network planning.</span></li>
  <li><span class="ms-date">2015</span><span class="ms-text">IoT environmental monitoring for 10kV switching stations, cutting manual patrols by over 70%.</span></li>
  <li><span class="ms-date">2014</span><span class="ms-text">Two China patents: an OPLC cross-connecting cabinet and remote-monitoring data transmission equipment.</span></li>
  <li><span class="ms-date">2012</span><span class="ms-text">Moved to Electronic Information Technician (IT &amp; communications O&amp;M), working on distribution automation.</span></li>
  <li><span class="ms-date">2011 – 12</span><span class="ms-text">Built and commissioned 110kV substations: Xintong, Chating, and Dongzhou Phase II.</span></li>
  <li><span class="ms-date">2010</span><span class="ms-text">B.Eng. in Electrical Engineering and Automation, Hangzhou Dianzi University (Provincial Excellent Graduate); joined State Grid Fuyang as a Substation Maintenance Technician.</span></li>
</ol>

Now: MS in Electrical Engineering at UT Knoxville (expected Dec 2027), researching AI-assisted grid analysis with CURENT. See all [projects](/projects/), [writing](/blog/), or [about me](/about/).

<script type="module" src="{{ '/assets/js/power-grid-hero.js' | relative_url }}"></script>
<script src="{{ '/assets/js/contact.js' | relative_url }}"></script>
