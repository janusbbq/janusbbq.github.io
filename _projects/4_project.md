---
layout: page
title: PMS System Data Interface
description: data interfaces integrating real-time data, records, and fault logs into a power production management system (2018).
img: assets/img/pms_data_interface.png
importance: 4
category: industry
---

In 2018 I developed data interfaces for a power production management system (PMS), integrating real-time operating data, equipment records, and fault logs so that they could be accessed consistently across the system.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/pms_data_interface.png" title="PMS system architecture" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    System architecture: the production control zone (SCADA, historical and time-series database servers, distribution application and interface adapter servers) connected through physical isolation devices to the management information zone and data acquisition networks.
</div>

The work covered:

- interfaces for real-time data from the SCADA and data acquisition layers;
- integration of historical records and time-series data;
- collection and integration of fault logs.
