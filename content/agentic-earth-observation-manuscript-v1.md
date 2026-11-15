# Agentic Earth Observation — Tasking & Downlink
**Lucile Jeanneret**

*Editorial manuscript v1 — for review before publication.*

## Editorial principles

This is an illustrated educational white paper, not an institutional presentation or a product brochure. The narrative moves from the geospatial industry to the physical realities of satellite operations, then to Meridian's operational challenges and an agentic architecture using Microsoft technologies. The prose should flow naturally in connected paragraphs, without staccato definitions, rhetorical slogans, or repetitive declarations that the company and scenario are fictional. Meridian is introduced once as a named case study. The simulator and interactive mock applications are teaching tools; factual scientific imagery and legal/technical qualifications retain appropriate attribution. All Meridian facts must remain consistent with `data/meridian.json`. Do not describe a simulated outcome as measured performance.

---

# Part I — Understanding Earth Observation

## 01 — Understanding the Geospatial Industry

Much of what we know about our planet comes from our ability to observe it and understand how it changes over time. Whether we are monitoring agricultural land, studying the expansion of a city or assessing the damage caused by a natural disaster, we rely on information that tells us not only what is happening, but also where it is happening.

This is where geospatial technologies come into play. By combining geographic information with observations collected from the ground, the air and space, they help us understand our environment and make more informed decisions. Satellites have become an important part of this ecosystem, allowing us to observe large areas of the Earth and revisit the same locations over time.

**Visual direction:** Keep this opening restrained: a small, delicate illustration of Earth or a landscape, with no elaborate flowchart. The reader should reach Meridian quickly.

## 02 — Meet Meridian

To explore how this industry works, let us take the example of an Italian Earth-observation company, which we will call **Meridian** throughout this paper.

Based in Rome, Meridian operates a constellation of 30 satellites, equipped with optical and radar instruments, and relies on ground stations in Norway, Spain and Kenya to receive the data collected in space. Its customers include agricultural organizations, emergency response agencies and defence institutions, each with different observation needs and delivery requirements.

Before examining how Meridian manages those requests, it helps to see the environment in which its satellites operate.

**Visual direction:** A compact company portrait, not a corporate slide. Display 30 satellites, 15 optical / 15 radar, three ground stations and four antennas only if the design can do so without delaying the explorer. Do not invent an employee headcount.

## 03 — Explore Meridian's Constellation

Meridian's satellites are constantly moving around Earth, following orbital paths that determine which regions they can observe and when. Their movements also influence when they can communicate with the ground stations responsible for receiving their data.

The interactive explorer below lets you discover this constellation, follow the satellites as they orbit the planet and see how their positions change over time. Rotate the globe, select a satellite and look at the regions beneath its path. You will notice that observing a particular place depends on where the satellite will be, rather than simply on where the customer needs an image.

Now turn to the stations in Norway, Spain and Kenya. A satellite must have a suitable communication opportunity to send its collected data to the ground. The opportunity to observe a place and the opportunity to transmit its data are related, but they are not the same event.

**Interaction:** Embed the existing orbital explorer at immersive width. Provide short, contextual learning cues for orbit, observation opportunity, station contact and elapsed simulated time. Preserve a discreet technical note identifying the playback as a visualization, not live telemetry or an operational feasibility calculation.

## 04 — Seeing Earth Through Different Eyes

Now that we have explored Meridian's constellation, we can look more closely at what its satellites actually observe. Although they travel around the same planet, the information they collect depends on the instruments they carry. Two satellites passing over a landscape may produce very different images of it.

Optical satellites collect light reflected by Earth's surface, much like a camera. Their images can reveal coastlines, fields, forests and changes in vegetation, while instruments that measure wavelengths beyond visible light can reveal additional characteristics of the landscape. Because this approach relies on reflected light, illumination and cloud cover can limit what the sensor can record.

Radar satellites work differently. They transmit electromagnetic signals towards the surface and measure the returning echoes. Those measurements describe properties such as surface structure and can be collected at night and through most cloud cover. Radar imagery often uses colours assigned during processing to help interpret the signals, rather than colours a person would see from space.

The two technologies therefore answer different questions. An optical image may be well suited to interpreting the visible condition of a landscape, while radar can offer valuable observations when clouds obscure it. Neither sensor is automatically a substitute for the other: suitability depends on the product the customer has requested.

**Visual direction:** Present the existing real Sentinel-2 Rome optical image beside the existing real Sentinel-1 central Italy radar image. Explain what each shows in plain language. Keep the original dates, credits and licensing, and state discreetly that the images cover different areas and dates, so they are examples rather than a controlled comparison.

### When clouds hide the observation

Even when a satellite passes over the right location at the right moment, the resulting image may not provide the information we need. Cloud cover is one of the most familiar challenges for optical imaging. A satellite can complete its acquisition successfully while the part of the landscape that matters to the customer remains hidden.

Imagine an emergency team waiting for a map of an affected area. If clouds cover that area, the image may be insufficient for the requested analysis, however accurately the satellite followed its plan. Radar may offer another way to observe the region, but changing sensors can also change the information available and may require the customer's agreement.

This is why planning an observation involves more than finding a satellite that will pass overhead. Meridian must consider whether the instruments and conditions are likely to produce useful data.

**Interaction:** Reuse the existing identical-terrain cloud comparison with a controllable overlay. Make clear that the slider changes a teaching visualization, not measured cloud percentage or actual satellite imagery. The AOI remains visible in both states.

## 05 — From Observation to Delivery

Once a suitable observation has been identified, several things must happen before the customer receives a usable result. The request must first be translated into a plan that specifies the area, the instrument and the time of acquisition. When the satellite reaches the right position, its instrument collects the data and stores it on board.

The data then needs a route back to Earth. During a suitable contact with a ground station, the satellite can transmit the observation, after which processing systems calibrate and locate the measurements and prepare the requested product. Quality checks establish whether that product meets the customer's requirements before it can be delivered to an authorized recipient.

Each stage has its own schedule and constraints. An observation can be acquired but still waiting for a downlink; received data can be waiting for processing; a finished image can fail a quality check. To understand Meridian's business, we therefore need to follow the entire journey from the customer's request to the product they can actually use.

**Visual direction:** A wide, scroll-linked illustrated sequence: Request → Plan → Acquire → Downlink → Process → Quality check → Deliver. Keep the existing process illustration only where it explains the physical stage correctly. Each stage should reveal one clear sentence, not an abstract slogan.

---

# Part II — Meridian's Operational Challenge

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

- The manuscript intentionally refers to Meridian as an Italian company **we will call Meridian**, rather than implying it is a real identified company. Avoid repeatedly using “fictional,” “illustrative” or “reference model” in the narrative. One unobtrusive methodology/publication note can establish the case-study nature.
- The source of truth specifies **30 satellites**, not 30 employees. Employee headcount is unspecified and must not be invented.
- Source dataset: 15 optical and 15 radar satellites, 3 ground stations in Norway, Spain and Kenya, 4 antennas total; Rome headquarters. Details such as orbit altitude and exact station sites remain in the dataset and should only be used when pedagogically useful.
- AR-1842: Greek Civil Protection, Attica, optical fire-impact map, four-hour deadline. Do not claim radar is an equivalent substitute or that the case has a verified successful outcome.
- Keep actual Sentinel image provenance and licensing. The two scenes are from different dates and extents. The cloud slider is synthetic, not meteorological evidence.
- EU Space Act is a proposal in the current manuscript's source snapshot; do not describe it as enacted. Keep relevant NIS2, GDPR, dual-use, Copernicus and Foundry preview qualifications in the appropriate references or technical sections.
- Retain the existing site visual identity without Frontier/Master Architect branding. Cover: **Agentic Earth Observation — Tasking & Downlink**, **Lucile Jeanneret**.
