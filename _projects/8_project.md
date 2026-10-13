---
layout: page
title: Storm Prediction and Grid-Resilience Exposure Mapping
description: from DYAMOND GEOS climate data to storm prediction, hotspot detection, and Southeast grid-impact priority ranking.
img: assets/img/storm_grid_headline.png
importance: 4
category: research
---

**COSC 526 Data Engineering · The University of Tennessee, Knoxville · Spring 2026 · IEEE SciVis Contest 2026 data**

Course paper: _Data-Driven Extreme Weather Impact Modeling for Southeastern Power System Resilience_

This project builds a data pipeline that streams a petascale global climate simulation and turns it into a storm-hazard map for planning the power grid in the Southeastern US. It predicts next-day storm occurrence, finds storm hotspots, and ranks regions by grid-impact priority.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/storm_grid_pipeline.png" title="Pipeline" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The pipeline: GEOS data, quality audit, atmospheric features, storm score, DBSCAN hotspots, prediction models, exposure index, and grid-impact priority ranking.
</div>

## Data

- **Source:** DYAMOND C1440-LLC2160 GEOS atmospheric simulation, streamed with OpenVisus from the National Science Data Fabric (NSDF) without downloading it locally.
- **Coverage:** 10,269 hourly timesteps from January 2020 to March 2021, about 14 months, on a 1440×1440×52 cubed-sphere grid.
- **Variables:** wind (U, V), pressure, temperature, vertical velocity, cloud liquid and ice water, cloud fraction, and convective tendency.

## Method

- **Storm features:** derived wind speed, pressure and temperature anomalies, vertical motion, and a precipitation proxy. Combined them into a weighted storm score with a 90th-percentile storm mask.
- **Hotspots:** detected storm hotspot clusters with DBSCAN, choosing eps from a k-distance plot.
- **Prediction:** built a per-timestep feature table with lag features and compared persistence, KNN, logistic regression, and random forest models. Evaluated them with F1, CSI, POD, FAR, bootstrap confidence intervals, and McNemar's test against persistence.
- **Grid impact:** built a storm exposure index (maximum, cumulative, and frequency of hazard) and ranked 36 regional patches by grid-impact priority.
- **Reproducibility:** 24 unit tests lock the design formulas and weights. The random seed is fixed and every run's parameters are saved.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/storm_grid_headline.png" title="Headline results" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    (a) Wind speed. (b) Storm score with the 90th-percentile mask. (c) DBSCAN hotspot clusters. (d) The top-5 grid-impact priority patches.
</div>

## Results

On the 14-month daily-stride run (298 training and 128 test rows), logistic regression with lag features performed best:

| Model                 | F1        | CSI       | POD   | FAR   |
| --------------------- | --------- | --------- | ----- | ----- |
| Logistic regression   | **0.712** | **0.553** | 0.863 | 0.394 |
| Persistence threshold | 0.676     | 0.510     | 0.671 | 0.319 |
| KNN (k=3)             | 0.623     | 0.453     | 0.589 | 0.339 |
| Random forest         | 0.504     | 0.337     | 0.452 | 0.431 |

McNemar's test could not reject equal error rates against persistence. Logistic regression's advantage comes from shifting its errors toward higher recall (POD), not from making fewer errors overall. For storm warnings, catching more storms at the cost of more false alarms is usually the better trade.

<div class="row">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/storm_grid_model_f1.png" title="Model comparison" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/storm_grid_priority_map.png" title="Grid-impact priority map" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Left: test F1 by model. Right: grid-impact priority score and top-k rank across the Southeast-oriented region.
</div>

## Scope

This project covers storm prediction and exposure mapping upstream of grid analysis. It is not validated against real outage records and does not include power-flow analysis. The storm labels come from the derived storm score, not from official storm reports. The Southeast region is approximated with a hand-fit projection of the cubed-sphere grid.
