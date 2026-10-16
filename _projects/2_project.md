---
layout: page
title: PV-Curve Agent
description: AI-based voltage-stability analysis that runs PV/nose-curve studies from natural-language requests.
img: assets/img/pv_curve_agent_card.png
importance: 2
category: research
---

**CURENT LTB / The University of Tennessee, Knoxville · 2026**

The PV-Curve Agent lets an engineer ask for a voltage-stability study in plain language and get back a complete PV (nose) curve analysis.

- Developed and validated a workflow that runs PV/nose-curve studies from natural-language requests. It reports load margin, nose-point voltage, and convergence, and plots the curves.
- Analyzed how rising load moves buses toward their voltage-collapse limits. This question matters in large-load interconnection studies.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/pv_curve_agent.png" title="PV-Curve Agent" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The PV-Curve Agent. Asked to "Generate PV curve" for the IEEE 39-bus system at Bus 5 (inductive load, power factor 0.95), it traces both branches of the P–V curve with the continuation method and marks the nose point at about 8,321 MW and 0.887 pu. The panel on the right holds the study parameters: step size, maximum load multiplier, voltage limit, line outages, and generator voltage setpoints.
</div>
