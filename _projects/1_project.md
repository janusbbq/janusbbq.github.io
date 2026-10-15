---
layout: page
title: LLM-for-AMS
description: power-system simulation automation, transmission analytics, and verification of AI-generated grid analyses.
img: assets/img/llm_ams_assistant.png
importance: 1
category: research
---

**CURENT LTB / The University of Tennessee, Knoxville · 2026 – present**

This project uses large language models to drive power-system studies in [AMS](https://github.com/CURENT/ams), the market and dispatch simulator from CURENT's Large-scale Testbed (LTB). The aim is to make these studies faster and reproducible, with results engineers can check.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/llm_ams_assistant.png" title="LLM · LTB · AMS assistant" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The LLM · LTB · AMS assistant. From the prompt "Build the IEEE39 case for October 2020 and run ED", the agent builds the case with that month's load data (744 hourly slots) and solves a DC economic dispatch with CLARABEL: the solver converged and all limits were respected. Generator output and line-flow plots follow.
</div>

## Load-growth and congestion studies

- Analyzed PJM 5-bus real-time economic dispatch (RTED) load-growth scenarios with AMS and the CLARABEL solver.
- Identified the load levels where transmission and generator constraints became binding and forced broader redispatch. As Line 4 congestion intensified, the maximum LMP at Bus 2 rose from about 0.25 to 1.16.

## Scenario automation and analytics

- Built a Python workflow that replaces manual load-variation studies with reproducible runs. Each run produces structured CSV/JSON outputs for dispatch, line flows, LMPs, and solver status.
- Automated analytics for line loading, binding constraints, dispatch changes, LMP ranking, objective cost, and failed runs.
- Corrected the generator dispatch reporting (Pmin, Pmax, utilization, status) so each unit is classified consistently as At Pmin, At Pmax, or Marginal.

## Verification

I am developing verification for AI-generated grid analyses. It uses four checks:

- comparison with the simulator;
- independent calculations;
- engineering-rule checks;
- reproducibility tests.
