# Agentic Earth Observation — Tasking & Downlink
**Lucile Jeanneret**

*Editorial manuscript v3 — concepts first, Meridian in Part II; revised 16 November 2026.*

## Editorial principles

This is an illustrated educational white paper, not an institutional presentation or a product brochure. Part I introduces satellite observations and their constraints, with an early interactive explorer. Part II introduces Meridian and connects those constraints to its business challenges. Part III develops the agentic architecture using Microsoft technologies. Preserve the prose outside the requested transitions and generic satellite explanations. The simulator and interactive mock applications are teaching tools; factual scientific imagery and legal/technical qualifications retain appropriate attribution. All Meridian facts must remain consistent with `data/meridian.json`. Do not describe a simulated outcome as measured performance.

---

# Part I — Understanding Earth Observation

## 01 — An Industry Observing a Changing Planet

Thousands of satellites are travelling around Earth as you read these words. Some connect us to the internet, others support navigation and communications, while a growing number carry instruments designed to observe our planet and the changes taking place on its surface.

According to the European Space Agency, approximately 15,800 satellites were still functioning in orbit in November 2026. Meanwhile, Europe's Copernicus programme offers a glimpse of the extraordinary amount of information that Earth observation has become capable of producing: by the end of 2025, its data platform held more than 120 million Sentinel products, representing an online archive of approximately 91 petabytes.

Before looking at an operator's business challenges, let us explore how satellites observe Earth and get their data to the ground.

**Visual direction:** Keep this opening short, with the restrained Earth drawing and dated ESA and Copernicus sources. Put the full-width explorer immediately after these three paragraphs. Introduce the company and its illustrations only in Part II.

## 03 — Explore Satellites in Orbit

*Interactive guide — Select a satellite to follow its orbit, rotate the Earth to explore its coverage, or display the ground stations to understand when communications become possible. The simulation runs at 60× speed and illustrates orbital behaviour rather than live satellite positions.*

### What Satellites Do

A satellite's mission describes the service it provides, not the height at which it flies. Earth-observation satellites measure our planet's surface, atmosphere or oceans. Communications satellites relay information between users and networks. Navigation satellites broadcast precise timing and orbital information, allowing receivers to combine signals from several spacecraft to determine position and time.

Behind these numbers lies an industry that has transformed the way we understand our planet. By combining satellite observations with geographic information and measurements collected on the ground, scientists, governments and businesses can monitor agricultural land, study environmental changes and assess the consequences of natural disasters with a level of geographical coverage that would otherwise be difficult to achieve.

Yet collecting information from space is far more complicated than simply pointing a camera towards Earth.

### Where Satellites Fly

Earth-observation satellites generally travel along orbits that carry them over different regions as the planet rotates beneath them. Their instruments are designed for different purposes: some capture light reflected by the surface, while others use radar to collect measurements independently of sunlight. And because satellites are constantly moving, the opportunity to observe a particular location may last only a short time.

Many imaging satellites use **low Earth orbit (LEO)**, below about 2,000 kilometres in altitude. Being closer can support detailed observations, but a spacecraft does not remain above one location. Its opportunities to revisit a place depend on the orbit, the instrument's viewing capabilities and the rest of the constellation. Communications satellites can also use LEO; mission and orbit are separate choices.

**Medium Earth orbit (MEO)** lies between LEO and geostationary altitude and is widely used by navigation constellations such as Galileo. In **geostationary orbit (GEO)**, about 35,786 kilometres above the equator, a satellite follows a circular orbit in the same direction and at the same angular rate as Earth's rotation. It therefore appears fixed in the sky to a ground observer. Communications and weather satellites often use this view to serve or monitor a broad region.

Altitude is only one part of the description. A **polar orbit** passes over or close to the poles as Earth rotates beneath it. A **sun-synchronous orbit** is a near-polar orbit whose plane gradually turns so that passes occur at approximately the same local solar time. This helps compare observations under similar illumination, but does not guarantee a daily image of every location or identical weather. These describe orbital geometry, not additional altitude bands.

### Bringing Data Back to Earth

There is another constraint. Once a satellite has collected an observation, that information still needs to reach Earth. In a conventional ground-station network, the spacecraft must establish a compatible communication link with a receiving station, which is only possible during certain contact windows. A satellite may therefore have completed its observation long before the data can be received and processed on the ground.

This spacecraft-to-ground transfer is called the **downlink**. During a low-orbit pass, a receiving antenna tracks the moving spacecraft while it remains in view. The contact must provide enough time and link capacity, use compatible communications equipment and have an available antenna slot. Data can wait in on-board storage between acquisition and reception; receiving it is not the same as processing it into a product that passes the customer's quality checks.

Data-relay satellites can provide another route to the ground and reduce dependence on direct station passes. That requires suitable equipment and an available relay service; it is not an automatic capability of every observation satellite. Here, we begin with the simpler direct-to-ground case.

**Visual direction:** Distinguish observation, communications and navigation with a graphite mission sketch. Follow the orbit explanation with labelled LEO, MEO and GEO schematics, clearly not to scale; do not imply that polar and sun-synchronous are altitude categories. Illustrate acquisition/on-board storage separately from downlink/ground reception using the existing approved process drawings. Keep explanatory figures beside their corresponding prose, before Seeing Earth Through Different Eyes, with scientific sources and accessible descriptions.

**Interaction:** Keep the existing explorer and its exact italic instruction. Place optional exploration and simulation/accessibility information next to that instruction, before the mission, orbit and downlink explanation. Preserve the teaching dataset and simulator functionality.

## 04 — Seeing Earth Through Different Eyes

Now that we have explored a satellite constellation, we can look more closely at what its satellites actually observe. Although they travel around the same planet, the information they collect depends on the instruments they carry. Two satellites passing over a landscape may produce very different images of it.

Optical satellites collect light reflected by Earth's surface, much like a camera. Their images can reveal coastlines, fields, forests and changes in vegetation, while instruments that measure wavelengths beyond visible light can reveal additional characteristics of the landscape. Because this approach relies on reflected light, illumination and cloud cover can limit what the sensor can record.

Radar satellites work differently. They transmit electromagnetic signals towards the surface and measure the returning echoes. Those measurements describe properties such as surface structure and can be collected at night and through most cloud cover. Radar imagery often uses colours assigned during processing to help interpret the signals, rather than colours a person would see from space.

The two technologies therefore answer different questions. An optical image may be well suited to interpreting the visible condition of a landscape, while radar can offer valuable observations when clouds obscure it. Neither sensor is automatically a substitute for the other: suitability depends on the product the customer has requested.

**Visual direction:** Keep this explanation in Part I without references to Meridian, including the image captions. Preserve the real Sentinel-2 Rome optical image and Sentinel-1 central Italy radar image, their dates, credits, licensing and the qualification that they are not a controlled comparison.

### When clouds hide the observation

Even when a satellite passes over the right location at the right moment, the resulting image may not provide the information we need. Cloud cover is one of the most familiar challenges for optical imaging. A satellite can complete its acquisition successfully while the part of the landscape that matters to the customer remains hidden.

Imagine an emergency team waiting for a map of an affected area. If clouds cover that area, the image may be insufficient for the requested analysis, however accurately the satellite followed its plan. Radar may offer another way to observe the region, but changing sensors can also change the information available and may require the customer's agreement.

This is why planning an observation involves more than finding a satellite that will pass overhead. An operator must consider whether the instruments and conditions are likely to produce useful data.

**Interaction:** Reuse the existing identical-terrain cloud comparison with a controllable overlay. Make clear that the slider changes a teaching visualization, not measured cloud percentage or actual satellite imagery. The AOI remains visible in both states.

## 05 — From Observation to Delivery

Once a suitable observation has been identified, several things must happen before the customer receives a usable result. The request must first be translated into a plan that specifies the area, the instrument and the time of acquisition. When the satellite reaches the right position, its instrument collects the data and stores it on board.

The data then needs a route back to Earth. During a suitable contact with a ground station, the satellite can transmit the observation, after which processing systems calibrate and locate the measurements and prepare the requested product. Quality checks establish whether that product meets the customer's requirements before it can be delivered to an authorized recipient.

Each stage has its own schedule and constraints. An observation can be acquired but still waiting for a downlink; received data can be waiting for processing; a finished image can fail a quality check. To understand an Earth-observation service, we therefore need to follow the entire journey from the customer's request to the product they can actually use.

**Visual direction:** Retain the seven clickable notebook diagrams: Request → Plan → Acquire → Downlink → Process → Quality check → Deliver. Keep the distinction between acquisition and ground reception.

---

# Part II — Meridian's Operational Challenge

## 02 — Meet Meridian

These physical constraints are at the heart of an Earth-observation operator's work. To understand how they shape day-to-day operations, we will follow an Italian company that we will call **Meridian**.

Based in Rome, Meridian operates a constellation of 30 satellites, combining optical and radar instruments, supported by three ground stations located in Norway, Spain and Kenya. Its customers include emergency response agencies, agricultural organizations and defence institutions, all of whom depend on receiving the right information about the right place at the right time.

**Visual direction:** Open Part II with this exact introduction, the approved Meridian logo, conceptual Rome offices and Rome world-map locator. Keep the fictional-company qualification discreet. Preserve the stable meet-meridian anchor; the company is no longer introduced in Part I.

## 06 — Who Needs Earth Observation?

Meridian's customers do not all ask for the same kind of information. An agricultural organization may want to compare fields across a growing season, making consistency over time especially important. An emergency response agency may need a recent observation within hours, because the usefulness of the information changes as an incident develops. A defence institution may have additional requirements governing access, handling and delivery.

These differences shape the work of the operator. The area to observe is only one part of a request: the customer also specifies what the product must reveal, when it is needed and who is allowed to receive it. Meridian must translate those expectations into observations that are physically possible and operationally deliverable.

**Visual direction:** Three human-scale customer portraits or applications of the data, with concise, specific needs. Avoid decorative personas with invented biographies.

## 07 — Anatomy of a Customer Request

A customer request begins with a place and a question. To act on it, Meridian needs to know the area of interest, the requested product, the observation period and the delivery deadline. The team must also verify the customer's entitlements and any restrictions that apply to the data.

Consider request **AR-1842**, submitted by Greek Civil Protection for an optical fire-impact map of Attica, Greece, with a four-hour deadline. The urgency is clear, but urgency alone cannot establish whether the product is achievable. Before acquisition planning begins, the request must be checked, qualified and approved. Only then should it enter the satellite-planning team's actionable backlog.

**Interaction:** A readable request form and a ticket detail view. Show intake approval as a distinct state. Do not show unapproved requests as actionable OrbitPlanner tickets.

## 08 — Inside Meridian's Operations

Meridian already has operational software for the work its teams perform. **OrbitPlanner** manages satellite acquisition opportunities and plans; **GroundLink** coordinates station contacts, antenna capacity and reception; **GeoFactory** handles imagery processing, quality checks and product delivery; and **MissionControl** reviews and authorizes the operations that require mission-control authority. Customer-facing intake, CRM and procedural documentation provide additional context, but they do not replace these four systems.

Each application serves a wider workload than any single customer request. Operators open a backlog of work that is ready for their stage, select a ticket and use the application's full operational view to make decisions. OrbitPlanner should see approved requests awaiting acquisition planning. GroundLink should see acquisitions that have been scheduled and now require downlink planning. GeoFactory should distinguish expected incoming data from processing jobs whose data has actually arrived. MissionControl's approval queues are driven by the actions that require authorization, not by a simplistic position at the end of a linear chain.

This separation matters because the same request progresses through several operational states. Planning a satellite pass does not authorize a spacecraft command, and reserving a ground contact does not mean the data has been received.

**Interaction:** A clickable architecture and four independently navigable product mockups with shared workflow state. Backlogs must enforce the eligibility rules above. Do not create screens that contain only AR-1842.

## 09 — Planning Under Constraints

An acquisition plan must bring together several moving parts. A satellite has to pass over the requested area during a suitable window, its instrument must be capable of producing the required observation, and the proposed acquisition must fit alongside commitments already made to other customers. For optical imaging, weather forecasts add uncertainty about whether the resulting image will be usable.

Even a promising acquisition is only part of the answer. The satellite must have enough capacity to store the data until a compatible ground-station contact is available, and the station needs an antenna slot that does not conflict with other transmissions. Processing and quality checks must then fit within the remaining delivery time.

Meridian currently reconciles these factors through daily planning cycles. When a high-priority request arrives after a plan has been assembled, operators may need to review several systems and negotiate changes before the next opportunity disappears. The challenge is not a shortage of information; it is the time and coordination required to turn changing information into a feasible plan.

**Interaction:** A 24-hour timeline with satellite passes, existing bookings, weather, ground contacts and processing capacity. Distinguish impossible, occupied and potentially usable opportunities.

## 10 — The Wildfire Mission

The Attica request makes these constraints tangible. Greek Civil Protection needs an optical fire-impact map within four hours, while Meridian must work around existing satellite assignments and ground-station reservations. A promising orbital pass may be approaching, but the forecast and actual cloud conditions do not necessarily agree.

If the required area is obscured, the team must determine whether another optical opportunity remains within the deadline. A radar acquisition might provide different information, but it cannot simply be presented as the same optical product. Any change to the requested deliverable needs to be explained and, where required, agreed with the customer.

The operator's responsibility is to make a defensible decision while the clock is moving: identify the feasible options, protect existing commitments, obtain the necessary approvals and communicate clearly when the original request cannot be fulfilled as specified.

**Interaction:** Reuse the Attica AOI, request AR-1842, the wildfire visual and a coherent mission timeline. Show decision branches and their consequences without inventing a successful outcome.

## 11 — A Business Decision

Meridian could respond to growing demand by investing in additional satellites, antennas or processing infrastructure. More capacity can create new opportunities, but it also brings cost, lead time and operational complexity. Before committing to that investment, the company needs to understand how much value remains unused within the constellation it already operates.

If opportunities are missed because planning takes too long, existing capacity may be underused even when demand is strong. Improving coordination could allow Meridian to respond to urgent requests sooner, use available contacts more effectively and reduce the amount of manual reconciliation between teams. It would not change orbital physics or eliminate bad weather, but it could help the organization make better use of the choices it genuinely has.

The decision is therefore an operational and economic one: what should Meridian automate, what should remain under human control, and which measurable improvements would justify the investment?

**Visual direction:** A clear comparison of expanding physical capacity versus improving coordination, with proposed KPIs. Present targets and financial scenarios as assumptions in methodology, not achieved results.

---

# Part III — Engineering Agentic Operations

## 12 — Understanding AI Agents

Traditional software works especially well when the steps and rules of a process are known in advance. Meridian already relies on this kind of software for orbital calculations, resource reservations and safety checks. Its harder coordination problems arise when the next useful action depends on interpreting a changing situation, consulting different sources and deciding which option to investigate.

An AI agent can help with that work by using a model to interpret context and call approved tools. It may read a customer request, retrieve a procedure, ask an application for availability or prepare a recommendation for review. The agent still needs explicit instructions, access boundaries, reliable records of what has happened and clear rules about which actions require approval.

Not every step should become agentic. A deterministic solver should calculate feasible orbital and station windows, while the responsible mission systems should enforce reservations, validation and command authorization. The purpose of the agent is to help coordinate these capabilities, not to invent opportunities or bypass them.

**Visual direction:** One simple diagram connecting Model + Context + Tools + State + Policies + Human approval, followed by a comparison of agent, workflow and deterministic solver.

## 13 — Meridian's Five Agents

The proposed architecture distributes the coordination work among five specialist agents. The **Tasking Intake Agent** checks that a request contains the information needed to proceed and gathers missing context. The **Priority Negotiation Agent** examines competing commitments and prepares options within contractual and operational policy. The **Acquisition Planning Agent** consults orbital opportunities and planning tools to develop feasible acquisition proposals.

Once an acquisition has been selected, the **Downlink & Processing Agent** coordinates compatible contacts and the processing work that follows reception. The **Product Delivery Agent** checks that the completed product and its permissions are ready for the customer. A durable orchestrator keeps the mission state and the handoffs between these responsibilities, so that work can resume after a delay or a human decision.

The agents do not share unlimited authority. Each operates through bounded tools and the workflow stops where a safety-critical or contract-changing decision needs the appropriate human authorization.

**Interaction:** Animated mission flow with five agents, explicit shared state, applications and approval gates. Retain the architecture's L3/L4 labels only with their project-specific definitions.

## 14 — Connecting Agents to Mission Systems

The agents can only make useful decisions if they work with the same information as Meridian's operational teams. That means connecting to OrbitPlanner, GroundLink, GeoFactory and the approved parts of MissionControl, as well as to customer entitlements in CRM and controlled procedures in SharePoint.

Rather than giving an agent broad access to an application, Meridian can expose specific capabilities through authenticated APIs and carefully scoped adapters, including MCP tools where appropriate. Reading satellite availability, proposing a reservation and requesting an authorized execution are different operations and should have different permissions. Existing private or on-premises systems can remain within their security boundaries while approved services mediate access.

MissionControl retains its responsibility for safety validation and command authorization. A plan suggested by an agent is not a spacecraft command, and an agent's confidence is not a substitute for the checks required before execution.

**Visual direction:** Interactive layered architecture: agents and orchestrator → approved adapters/MCP → four operational applications → physical satellite and ground systems. Distinguish read, propose, reserve and authorize.

## 15 — Building with Microsoft Foundry

Microsoft Foundry provides the engineering environment in which Meridian can develop, evaluate and operate the AI components of this architecture. The work begins with the responsibilities of each agent: understanding requests, interpreting operational exceptions, using tools correctly and explaining decisions in terms that an operator can verify.

Those responsibilities guide model selection, instructions and access to context. Meridian can test candidate models against realistic mission cases, including incomplete requests, conflicting reservations, cloud-related changes and attempted actions beyond an agent's authority. The evaluation must examine not only whether an answer sounds plausible, but whether the agent selected the right tools, respected the available evidence and stopped when approval was required.

As the solution moves toward operation, tracing, monitoring, access controls and change management become part of the architecture. Foundry supports the AI engineering lifecycle; the existing mission applications remain the systems of record for operational decisions and execution.

**Visual direction:** An implementation journey from responsibility → model and instructions → tools and context → evaluation → deployment → observability. Preserve verified feature availability and preview qualifications in a compact technical note, rather than in the narrative prose.

## 16 — Revisiting the Wildfire Mission

Return to request AR-1842. The customer still needs an optical fire-impact map of Attica within four hours, and the satellites still follow the same orbits. What changes is how quickly Meridian can bring the relevant information together and move a request through the work that its teams already perform.

The intake agent checks the request and its permissions before it reaches acquisition planning. The planning agent retrieves possible satellite passes, while the priority agent examines conflicts with existing commitments. GroundLink opportunities and processing capacity can be assessed alongside the acquisition plan, allowing operators to review a more complete proposal rather than discovering downstream problems one system at a time.

If clouds make the optical product unsuitable, the agents can assemble alternatives and explain their consequences. They cannot promise that radar will produce the same result, create a missing orbital opportunity or authorize a spacecraft command. The appropriate operator and customer decisions remain visible in the mission history.

The benefit to test is faster, more consistent coordination, with an auditable record of why each option was considered and what was ultimately approved.

**Interaction:** Revisit the same timeline and application backlogs from the earlier mission. Contrast manual handoffs with the proposed agent-supported workflow without asserting unmeasured time savings.

## 17 — From Architecture to Operations

A credible rollout would begin with a narrow part of the process where the agents can provide value without taking control of safety-critical operations. Meridian could first let agents read approved information and prepare recommendations, then evaluate how often those recommendations are correct, complete and useful to operators. Only after the underlying controls have been demonstrated should bounded actions, such as approved reservations, be considered.

Success needs to be measured across the full service. Request-to-product time, missed acquisition opportunities, antenna utilization, processing delays, product acceptance and operator workload each tell part of the story. Evaluation should also track policy compliance, inappropriate tool calls, human overrides and the ability to explain a decision after the event.

The aim is to help Meridian use its existing constellation more effectively while keeping the people and systems responsible for the mission in control. The satellites will continue to follow their orbits; the opportunity lies in making the organization around them more responsive.

**Closing visual:** Return to the Earth and its orbiting constellation. End on the business decision and measurable next steps, not a promotional slogan. Keep references, scientific credits, glossary and detailed methodology accessible as supporting material.

---

## Editorial and factual review notes

- Meridian is introduced in Part II using the author's retained wording. Do not move its company portrait back into Part I.
- Sequence IDs remain stable: sequence 02 is now the opening of Part II, after Part I's sequences 01, 03, 04 and 05. These source IDs are not visible section counters.
- The source of truth specifies **30 satellites**, not 30 employees. Employee headcount is unspecified and must not be invented.
- Source dataset: 15 optical and 15 radar satellites, 3 ground stations in Norway, Spain and Kenya, 4 antennas total; Rome headquarters. Details such as orbit altitude and exact station sites remain in the dataset and should only be used when pedagogically useful.
- AR-1842: Greek Civil Protection, Attica, optical fire-impact map, four-hour deadline. Do not claim radar is an equivalent substitute or that the case has a verified successful outcome.
- Keep actual Sentinel image provenance and licensing. The two scenes are from different dates and extents. The cloud slider is synthetic, not meteorological evidence.
- EU Space Act is a proposal in the current manuscript's source snapshot; do not describe it as enacted. Keep relevant NIS2, GDPR, dual-use, Copernicus and Foundry preview qualifications in the appropriate references or technical sections.
- Retain the existing site visual identity without Frontier/Master Architect branding. Cover: **Agentic Earth Observation — Tasking & Downlink**, **Lucile Jeanneret**.
