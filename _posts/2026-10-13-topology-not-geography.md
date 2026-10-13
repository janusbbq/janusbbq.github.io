---
layout: post
title: "Exposure is not impact: why feeder topology matters in storm outage assessment"
date: 2026-10-13 12:00:00-0400
description: notes on the NAPS 2026 paper on topology-aware assessment of extreme-weather impacts on distribution systems.
tags: resilience distribution-systems extreme-weather
categories: research-notes
related_posts: false
---

When a storm is forecast, a common first question is: _which parts of the network are inside the storm's path?_ That geographic view is useful, but on a distribution feeder it can badly understate what will happen. These notes summarize the main idea of a NAPS 2026 paper I co-authored with Junjie Yin, Xinyu Feng, and Prof. Fangxing Li at CURENT.

## The radial feeder problem

Most distribution feeders run radially, with tie-switches open. A fault on one branch does not just take out the equipment in the storm's path; it disconnects **every bus downstream** of that branch. So the operational impact depends on two things together:

- **where** the weather hits (geographic exposure), and
- **which branches** it hits (their position in the feeder topology).

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/naps_topology_propagation.png" title="Geographic exposure vs. topology-aware propagation" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    IEEE 33-bus feeder. (a) 7 buses lie inside the rain buffer. (b) Following the topology, 21 downstream buses lose service.
</div>

## What the framework does

The paper builds an early-warning workflow for torrential rain:

1. **Event uncertainty.** Represent the forecast as several probabilistic rain tracks, each with a buffered influence corridor and a spatial field of rainfall intensity and wind.
2. **Branch fault probability.** Combine each branch's local weather exposure with an inherent fragility index (line length, vegetation, aging, terrain, criticality) in a logistic model.
3. **Topology-aware propagation.** Run a breadth-first search from the feeder root, map each faulted branch to its downstream subtree, and compute affected load, energy not served (ENS), expected ENS across scenarios, and post-fault voltage violations.
4. **Visualization.** Draw the impact zones in CURENT LTB-AGVis so operators can see them on a map.

## The result worth remembering

Three rain tracks were forecast for the IEEE 33-bus case, with probabilities of 60%, 30%, and 10%. The **least likely** track, at 10%, caused the **largest** consequence: 8 faulted branches, 21 affected buses, 2.055 MW of affected load, and 4.11 MWh of ENS. Its faulted branches sit in upstream feeder sections, so each fault disconnects a large part of the feeder. Across all three scenarios, the expected energy not served was 0.924 MWh.

For planning and operations, that means a low-probability event cannot be dismissed just because it is unlikely. What matters is probability _times_ consequence, and the consequence comes from the topology.

## Why this matters to me

At State Grid I spent years with fault work orders, fault-prone-area maps, and distribution automation designed to isolate faults and restore service quickly. This paper turns the same intuition into a quantitative screening tool: before the storm arrives, find the branches whose failure would hurt the most.

The project page has more figures: [Extreme-Weather Impacts on Distribution-System Resilience](/projects/3_project/).
