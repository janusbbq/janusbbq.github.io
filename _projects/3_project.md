---
layout: page
title: Extreme-Weather Impacts on Distribution-System Resilience
description: topology-aware assessment of how torrential-rain outages propagate through distribution feeders (NAPS 2026).
img:
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

On the IEEE 33-bus feeder, the lowest-probability rain track (10%) caused the largest impact: 2.055 MW of affected load and 4.11 MWh of ENS. Its faulted branches sit in upstream feeder sections. The expected energy not served across all scenarios was 0.924 MWh.

I contributed to the technical review and preparation of the paper. A demo video is on the [CURENT LTB YouTube channel](https://youtu.be/Npd_iQdnOkM).

{% cite yin2026naps %}
