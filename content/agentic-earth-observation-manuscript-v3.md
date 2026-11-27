# The Doe Project — Coordinating Earth Observation with AI Agents
**Lucile Jeanneret**

*Editorial revision — 27 November 2026.*

## Editorial principles

Four reading parts and reference annexes. Keep one concise qualification per visual, with methods and full credits in the annexes. Stable source identifiers preserve existing links; they are not displayed as chapter numbering. Historical CEMS records and fictional Meridian operations remain separate. The shared teaching dataset and operational approval gates are unchanged.

---

# Part I — Understanding Earth Observation

## 01 — An Industry Observing a Changing Planet

Thousands of satellites are circling Earth as you read this. Some carry the internet, others support navigation, and a growing number observe the planet itself. In November 2026, about 15,800 satellites were functioning in orbit.¹ By the end of 2025, Copernicus alone held more than 120 million Sentinel products, about 91 petabytes of data.²

Combined with maps and ground measurements, these observations let scientists, governments and businesses monitor crops, track environmental change and assess disasters across large areas. Yet collecting useful information from space is far more complicated than pointing a camera at Earth.

## 03 — Explore Satellites in Orbit

*Select a satellite to follow its orbit, or show the ground stations to see when contact is possible. Drag to rotate, scroll to zoom. Simulated at 60× speed, not live positions.*

### What Satellites Do

A satellite's mission describes the service it provides, not how high it flies. Earth-observation satellites measure the surface, atmosphere and oceans. Communications satellites relay information between users and networks. Navigation satellites broadcast timing and orbit data that receivers combine to compute their position.

### Where Satellites Fly

Most Earth-observation satellites fly in **low Earth orbit (LEO)**, below about 2,000 km. Being close allows detailed images, but a satellite never stays above one place: it passes over different regions as Earth turns beneath it. How often it can return to a given site depends on its orbit, its instrument and the rest of the constellation.

Higher up, **medium Earth orbit (MEO)** hosts navigation constellations such as Galileo. At about 35,786 km above the equator, a geostationary **(GEO)** satellite turns with Earth and appears fixed in the sky, which suits communications and weather monitoring over a wide region.

Two other terms describe the path rather than the altitude. A **polar orbit** passes near the poles. A **sun-synchronous orbit** crosses each place at roughly the same local solar time, which makes images easier to compare.

### Bringing Data Back to Earth

Once a satellite has collected an observation, the data still has to reach the ground. This transfer, the **downlink**, is only possible during a contact window: the satellite must be in view of a compatible ground station with a free antenna. Until then, the data waits in on-board storage. An image can therefore be taken long before anyone on the ground can use it.

Relay satellites can offer another route, but only for spacecraft equipped for it. Here we stay with the simpler direct-to-ground case.

## 04 — Seeing Earth Through Different Eyes

Two satellites passing over the same landscape can produce very different images, depending on the instrument they carry.

Optical satellites record reflected sunlight, much like a camera. They show coastlines, fields and vegetation clearly, but they need daylight and a clear sky.

Radar satellites send their own signal and measure the echo. They work at night and through most clouds, but their images describe surface structure, and their colours are added during processing.

Neither replaces the other: the right sensor depends on what the customer needs to see.

### When clouds hide the observation

Even a perfectly executed pass can be useless. If clouds cover the area that matters, the optical image may not support the analysis, however precisely the satellite followed its plan. Switching to radar may help, but it changes the information delivered and may need the customer's agreement.

Planning an observation is therefore not just finding a satellite overhead. The operator must judge whether the result is likely to be usable.

## 05 — From Observation to Delivery

Between a customer's request and a usable product, seven steps follow one another: request, plan, acquire, downlink, process, quality check and deliver. Each has its own schedule and constraints. An image can be acquired but still waiting for a downlink; received data can be waiting for processing; a finished product can fail its quality check.

To understand an Earth-observation service, we have to follow the whole journey.

---

# Part II — Meridian's Operational Challenge

## 02 — Meet Meridian

To see how these constraints shape daily work, we follow Meridian, a fictional operator based in Rome. Meridian runs 30 optical and radar satellites, supported by three ground stations in Norway, Spain and Kenya. Its customers (emergency agencies, agricultural organisations and defence institutions) all need the right information about the right place at the right time.

## 06 — Who Needs Earth Observation?

Each customer asks for something different. Agriculture needs comparable images across a growing season. Emergency response needs a recent image within hours. Defence adds strict rules on access and delivery. A request is never just an area: it also says what the product must show, when it is needed and who may receive it.

## 07 — Anatomy of a Customer Request

Take request **AR-1842**: Greek Civil Protection asks for an optical fire-impact map of Attica, Greece, within four hours. Urgency alone does not make it feasible. Before any planning, the team checks the customer's entitlement, the export screening, the area, the product and the deadline. Only then does the request enter the planning backlog.

## 08 — Inside Meridian's Operations

Follow the same fire request through Meridian's four applications. Select an application to see the information its team needs, the decision it can make and what is still missing. OrbitPlanner finds the observation; GroundLink handles the contact; MissionControl reviews and authorises the plan; GeoFactory processes the image and checks its quality.

CRM and SharePoint add customer and procedural context. The other requests remain in each application's backlog, but AR-1842 stays in view as its state changes.

## 09 — Planning Under Constraints

An acquisition plan brings together orbital windows, instrument capability, weather and existing commitments. A compatible station contact and processing capacity must also fit within the delivery deadline. The operational challenge is assessing these changing constraints together before the next feasible opportunity disappears.

## 10 — The Wildfire Mission

To see how long an urgent request really takes, let's look at a real emergency: the August 2024 wildfire near Varnavas, in Greece's Attica region.

## 11 — A Business Decision

Meridian could buy more satellites, antennas or processing capacity, at the price of cost, delay and complexity. Before investing, it needs to know how much value its current constellation leaves unused. If opportunities are missed because planning is too slow, the bottleneck is coordination, not capacity.

The question is therefore: what should Meridian automate, what must stay under human control, and which measurable gains would justify the investment?

---

# Part III — Engineering Agentic Operations

## 12 — Understanding AI Agents

Traditional software excels when the steps are known in advance, and Meridian already relies on it for orbital calculations, reservations and safety checks. The harder problems arise when the next action depends on a changing situation and on several sources at once.

An AI agent helps there. It uses a model to interpret the context and call approved tools: read a request, retrieve a procedure, check availability, prepare a recommendation. It still needs clear instructions, limited access, reliable records and rules about what requires approval.

Not every step should become agentic. Solvers compute feasible windows; mission systems enforce reservations and command authorisation. The agent coordinates them. It does not replace them.

## 13 — Meridian's Five Agents

The coordination work is shared among five specialist agents. A durable orchestrator keeps the mission record and the handoffs, so work can resume after a delay or a human decision. Each agent acts only through its own tools, and the workflow stops wherever a safety-critical or contract-changing decision needs a person.

## 14 — Connecting Agents to Mission Systems

Agents are only useful if they see what operators see. They connect to OrbitPlanner, GroundLink, GeoFactory and the approved parts of MissionControl, plus customer entitlements in CRM and procedures in SharePoint.

Instead of broad access to an application, each capability is exposed through a narrow, authenticated interface, including MCP tools where relevant. Four levels of authority stay separate: **read, propose, reserve and authorise**. Only MissionControl can authorise spacecraft operations. A plan suggested by an agent is never a spacecraft command.

## 15 — Building with Microsoft Foundry

Microsoft Foundry is where Meridian builds, tests and runs these agents. Each agent's job determines its model, instructions and access. Candidate models are tested on realistic mission cases (incomplete requests, conflicting reservations, a sudden cloud) and judged not only on their answers but on whether they used the right tools and stopped when approval was needed. In operation, tracing, monitoring and change control complete the picture, while the mission applications remain the systems of record.

## 16 — Revisiting the Wildfire Mission

Back to AR-1842. The satellites follow the same orbits; what changes is how fast Meridian brings the information together. The intake agent checks the request, the planning agent looks for passes, the priority agent checks conflicts, and ground contacts and processing capacity are assessed at the same time. Operators review one complete proposal instead of discovering problems one system at a time.

If clouds spoil the optical image, the agents assemble alternatives and explain their trade-offs. They cannot promise that radar will give the same result, create a missing pass or authorise a command. Every decision stays in the mission history.

## 17 — From Architecture to Operations

A credible rollout starts small. First, agents only read and recommend, and operators compare those proposals with their own decisions. Only once the controls are proven do agents take bounded actions, such as approved reservations.

Success is measured across the whole service: request-to-product time, missed opportunities, antenna use, processing delays, product acceptance and operator workload, along with policy compliance and human overrides.

The satellites will keep following their orbits; the opportunity lies in making the organisation around them more responsive.

---

## Editorial and factual review notes

The source of truth remains the shared Meridian dataset. There are 30 satellites (15 optical, 15 radar), five planes, three stations and four antennas. Stable sequence IDs and AR-1842's optical requirement remain unchanged. CEMS timestamps and all seven integer-minute intervals are historical evidence; simulated state transitions are not measured performance.
