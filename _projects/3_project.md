---
layout: page
title: Extreme-Weather Impacts on Distribution-System Resilience
description: topology-aware assessment of how torrential-rain outages propagate through distribution feeders (NAPS 2026).
img: assets/img/naps_agvis_impact_zones.jpg
importance: 3
category: research
related_publications: true
---

**NAPS 2026 · with Junjie Yin, Xinyu Feng, and Fangxing Li (CURENT, The University of Tennessee)**

Extreme weather causes outages that depend on two things: where the storm goes and how the feeder is connected. A branch fault in a radial feeder disconnects every bus downstream of it, so the most exposed area is not always the one with the largest consequences.

The paper proposes a framework for early-warning assessment of torrential rain events. It has four steps:

- **Event uncertainty.** Model probabilistic rain-track scenarios with buffered influence corridors and a spatial field of rainfall intensity and wind.
- **Branch fault probability.** Combine each branch's localized weather exposure with an inherent fragility index (line length, vegetation, aging, terrain, criticality) in a logistic fault model.
- **Topology-aware propagation.** Use a BFS over the radial feeder to map each faulted branch to its downstream affected subtree. Quantify the affected load, energy not served (ENS), expected energy not served (EENS), and post-fault voltage violations.
- **Visualization.** Export the impact zones (convex hulls of the affected buses) as GeoJSON and render them in CURENT LTB-AGVis.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/naps_workflow.png" title="Event-conditioned fault probability workflow" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Fig. 1 of the paper: probabilistic rain tracks, branch fragility, and event-conditioned fault probability feeding the topology-aware propagation step.
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/naps_topology_propagation.png" title="Geographic exposure vs. topology-aware propagation" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Fig. 3 of the paper, on the IEEE 33-bus feeder. (a) Seven buses fall inside the rain buffer. (b) After topology-aware propagation, 21 downstream buses lose service.
</div>

On the IEEE 33-bus feeder, the lowest-probability rain track (10%) caused the largest impact: 2.055 MW of affected load and 4.11 MWh of ENS. Its faulted branches sit in upstream feeder sections. The expected energy not served across all scenarios was 0.924 MWh.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/naps_agvis_impact_zones.jpg" title="Impact zones in CURENT LTB-AGVis" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Fig. 8 of the paper: forecast rain tracks, faulted branches (red ×), and topology-aware impact zones on a UTK campus-based 262-bus distribution system in CURENT LTB-AGVis.
</div>

I contributed to the technical review and preparation of the paper. A demo video is on the [CURENT LTB YouTube channel](https://youtu.be/Npd_iQdnOkM).

{% cite yin2026naps %}
