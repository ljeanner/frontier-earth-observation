export function sketch(label, id, drawing, viewBox = '0 0 800 360') {
  return `<svg viewBox="${viewBox}" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">
    <defs><pattern id="${id}" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(32)"><path d="M0 0V9" stroke="currentColor" stroke-width=".7" opacity=".22"/></pattern></defs>
    <g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${drawing}</g>
  </svg>`;
}

export function spacecraft(id, x, y) {
  return `<g transform="translate(${x} ${y}) rotate(17)">
    <path d="M-15-13H15V13H-15Z" fill="url(#${id})"/>
    <path d="M-66-17H-25V17H-66ZM25-17H66V17H25Z"/>
    <path d="M-52-17V17M-38-17V17M38-17V17M52-17V17M-66 0H-25M25 0H66M-25 0H-15M15 0H25" opacity=".65"/>
  </g>`;
}

function requestDrawing(id) {
  return sketch('An observation request sheet: a drawn area of interest, a product and a deadline.', id, `
    <path d="M186 29L563 36L579 323L174 318Z"/>
    <path d="M198 43L550 49M198 49L549 55" opacity=".28"/>
    <path d="M216 91H397V236H216Z" fill="url(#${id})"/>
    <path d="M217 121Q255 99 282 135T347 143T396 120M217 162Q258 135 291 174T396 164M217 205Q258 177 306 213T396 209" opacity=".6"/>
    <path d="M265 134L336 145L347 196L274 208Z" stroke="var(--green)" stroke-width="2.5" stroke-dasharray="6 5"/>
    <path d="M429 113H530M429 130H514M429 203H495" opacity=".65"/>
    <circle cx="516" cy="208" r="26"/><path d="M516 190V208L530 218"/>
    <path d="M216 278H527M216 286H473" opacity=".4"/>
    <path d="M598 268L641 79L650 82L609 272L599 289Z" fill="url(#${id})"/>
    <g fill="currentColor" stroke="none" font-family="Georgia,serif" font-size="24"><text x="218" y="77">Area of interest</text><text x="429" y="94">Product</text><text x="429" y="171">Deadline</text></g>`);
}

function planningDrawing(id) {
  return sketch('A satellite observation opportunity is matched to a pencilled schedule for acquisition, ground contact and processing resources.', id, `
    <path d="M75 238Q216 172 352 238M88 251Q216 193 339 251" opacity=".65"/>
    <path d="M83 146Q142 37 318 84" stroke-dasharray="5 6" opacity=".6"/>
    ${spacecraft(id, 203, 73)}
    <path d="M205 94L169 214M205 94L261 213" stroke-dasharray="4 5" opacity=".45"/>
    <path d="M166 216L207 203L261 216L219 233Z" fill="url(#${id})" stroke="var(--green)" stroke-width="2"/>
    <path d="M389 45L737 53L729 286L382 278Z"/>
    <path d="M402 67L720 74M402 72L720 79" opacity=".25"/>
    <path d="M539 105V256M593 105V256M647 105V256M701 105V256" opacity=".2"/>
    <path d="M537 143H710M537 198H710M537 253H710" opacity=".35"/>
    <path d="M546 118H587V139H546ZM598 173H641V194H598ZM654 228H700V249H654Z" fill="url(#${id})" stroke="var(--green)" stroke-width="2"/>
    <path d="M567 147L619 167M620 202L674 222" stroke-dasharray="3 5" opacity=".5"/>
    <g fill="currentColor" stroke="none" font-family="Georgia,serif" font-size="24">
      <text x="112" y="310">Observation window</text><text x="433" y="323">Resources &amp; timing</text>
      <text x="403" y="136">Acquire</text><text x="403" y="191">Downlink</text><text x="403" y="246">Process</text>
    </g>`);
}

export function acquisitionDrawing(id) {
  return sketch('A satellite instrument observes an area on Earth and records its measurements in on-board storage, without yet transmitting them to a ground station.', id, `
    <path d="M83 146Q142 37 318 84" stroke-dasharray="5 6" opacity=".6"/>
    ${spacecraft(id, 203, 73)}
    <path d="M197 90L203 105L213 101L210 89" fill="url(#${id})"/>
    <path d="M205 107L163 251M205 107L268 251" stroke-dasharray="4 5" opacity=".45"/>
    <path d="M75 265Q214 185 352 265M90 280Q216 209 338 280" opacity=".65"/>
    <path d="M163 251L204 236L268 251L225 270Z" fill="url(#${id})" stroke="var(--green)" stroke-width="2"/>
    <path d="M181 251L225 258M204 243L246 253" opacity=".45"/>
    <path d="M289 107H463M451 98L463 107L451 116"/>
    <path d="M510 89H680V230H510Z" fill="url(#${id})"/>
    <path d="M519 81H689V222M528 73H698V214" opacity=".5"/>
    <path d="M526 118H664M526 148H664M526 178H664M526 208H664" opacity=".55"/>
    <path d="M548 103V217M578 103V217M608 103V217M638 103V217" opacity=".28"/>
    <path d="M528 132L550 126L571 139L593 130L614 143L636 132L659 138" stroke="var(--green)" stroke-width="2"/>
    <g fill="currentColor" stroke="none" font-family="Georgia,serif" font-size="24">
      <text x="127" y="322">Observation</text><text x="492" y="288">On-board storage</text>
    </g>`);
}

export function downlinkDrawing(id) {
  return sketch('During a compatible contact window, stored spacecraft data is transmitted to a receiving dish and then into ground reception systems; this is separate from collecting the observation.', id, `
    <path d="M62 145Q116 39 288 82" stroke-dasharray="5 6" opacity=".6"/>
    ${spacecraft(id, 175, 79)}
    <path d="M185 100L437 161" stroke="var(--green)" stroke-width="2" stroke-dasharray="6 5"/>
    <path d="M423 150L437 161L419 165" stroke="var(--green)" stroke-width="2"/>
    <path d="M440 235Q527 248 518 157L440 235Z" fill="url(#${id})"/>
    <path d="M452 222Q508 232 514 170M465 209Q498 219 508 183M478 196L504 211" opacity=".55"/>
    <path d="M440 235L446 164L518 157"/>
    <circle cx="446" cy="164" r="4" fill="var(--paper)"/>
    <path d="M493 231L505 291H477L488 233M464 292H521L531 301H453Z" fill="url(#${id})"/>
    <path d="M382 303H565M402 309H544" opacity=".45"/>
    <path d="M505 269H576V216H603M591 208L603 216L591 224"/>
    <path d="M610 158H708V247H610Z" fill="url(#${id})"/>
    <path d="M617 151H715V240M624 144H722V233" opacity=".5"/>
    <path d="M625 181H693M625 201H693M625 221H677" opacity=".55"/>
    <g fill="currentColor" stroke="none" font-family="Georgia,serif" font-size="24">
      <text x="108" y="225">Contact window</text><text x="392" y="337">Ground station</text><text x="585" y="286">Received data</text>
    </g>`);
}

function qualityDrawing(id) {
  return sketch('A magnifying glass examines the coverage and geometry of a map product beside an uncompleted checklist for coverage, geometry, image quality and metadata.', id, `
    <path d="M98 73L365 81L358 279L91 271Z" fill="url(#${id})"/>
    <path d="M105 118Q149 91 192 130T277 135T360 115M101 165Q148 139 194 176T358 162M97 218Q147 187 207 224T355 216" opacity=".65"/>
    <path d="M177 130L261 145L277 218L190 233Z" stroke="var(--green)" stroke-width="2" stroke-dasharray="5 4"/>
    <circle cx="228" cy="170" r="67" fill="var(--paper)"/>
    <circle cx="228" cy="170" r="61" fill="url(#${id})" opacity=".55"/>
    <path d="M178 150Q201 130 225 153T278 151M173 182Q201 163 229 186T280 181M195 119V216M227 110V228M260 119V216M180 139H275M170 171H286M180 203H275" opacity=".45"/>
    <path d="M191 141L252 151L262 202L201 213Z" stroke="var(--green)" stroke-width="2"/>
    <path d="M272 220L324 273L336 262L283 209Z" fill="url(#${id})"/>
    <path d="M381 174H443M431 165L443 174L431 183"/>
    <path d="M475 53L715 62L706 290L466 280Z"/>
    <path d="M489 78L696 85M489 83L696 90" opacity=".3"/>
    <path d="M489 111H506V128H489ZM487 157H504V174H487ZM485 203H502V220H485ZM483 249H500V266H483Z"/>
    <g fill="currentColor" stroke="none" font-family="Georgia,serif" font-size="24">
      <text x="128" y="320">Inspect the product</text>
      <text x="520" y="128">Coverage</text><text x="518" y="174">Geometry</text>
      <text x="516" y="220">Image quality</text><text x="514" y="266">Metadata</text>
    </g>`);
}

function processingDrawing(id) {
  return sketch('Raw observation strips are calibrated and aligned into a prepared geospatial product.', id, `
    <path d="M100 121L245 84L293 217L148 254Z" fill="url(#${id})"/>
    <path d="M119 137L258 101M128 161L267 127M137 187L276 153M146 213L285 179" opacity=".55"/>
    <path d="M111 111L255 75L302 208" opacity=".4"/>
    <path d="M325 171H443M431 162L443 171L431 180"/>
    <path d="M354 127V212M381 116V221M409 127V212" opacity=".55"/>
    <circle cx="354" cy="148" r="6"/><circle cx="381" cy="191" r="6"/><circle cx="409" cy="154" r="6"/>
    <path d="M487 98H692V250H487Z" fill="url(#${id})"/>
    <path d="M487 139Q529 110 560 151T625 155T692 131M487 179Q525 153 569 190T692 180M487 220Q531 189 584 223T692 214" opacity=".7"/>
    <path d="M520 116V233M552 116V233M584 116V233M616 116V233M648 116V233M501 130H678M501 162H678M501 194H678M501 226H678" opacity=".22"/>
    <path d="M539 138L612 147L626 207L548 218Z" stroke="var(--green)" stroke-width="2"/>
    <g fill="currentColor" stroke="none" font-family="Georgia,serif" font-size="24"><text x="112" y="301">Measurements</text><text x="487" y="301">Prepared product</text></g>`);
}

function deliveryDrawing(id) {
  return sketch('An accepted map product passes through a controlled-access boundary to an authorized recipient.', id, `
    <path d="M108 94L169 84L231 98L290 87V253L231 265L169 251L108 265Z" fill="url(#${id})"/>
    <path d="M169 84V251M231 98V265" opacity=".5"/>
    <path d="M109 145Q145 125 174 158T232 161T290 145M109 203Q149 176 186 212T290 202" opacity=".65"/>
    <path d="M143 142L205 152L214 209L154 217Z" stroke="var(--green)" stroke-width="2"/>
    <path d="M322 178H376M364 170L376 178L364 186M434 178H489M477 170L489 178L477 186"/>
    <path d="M390 78V130M390 226V280M420 78V130M420 226V280" stroke-dasharray="4 6" opacity=".5"/>
    <rect x="381" y="158" width="48" height="43" rx="3"/><path d="M390 158V145A15 15 0 0 1 420 145V158"/><circle cx="405" cy="176" r="3"/><path d="M405 179V188"/>
    <path d="M530 117H698V236H530Z" fill="url(#${id})"/><path d="M530 117L614 177L698 117M530 236L588 184M698 236L640 184"/>
    <circle cx="680" cy="119" r="26" fill="var(--paper)"/><path d="M667 118L677 128L694 108" stroke="var(--green)" stroke-width="2.5"/>
    <g fill="currentColor" stroke="none" font-family="Georgia,serif" font-size="24"><text x="113" y="310">Accepted product</text><text x="518" y="310">Authorized recipient</text></g>`);
}

export function enhanceProcessIllustrations(container) {
  for (const [plateIndex, plate] of [...container.querySelectorAll('.process-plate')].entries()) {
    const drawings = plate.querySelector('.journey-drawings');
    const map = plate.querySelector('.process-map');
    const steps = [...map.children];
    const originals = [...drawings.children];
    if (steps.length !== 7 || originals.length !== 2) throw new Error('The illustrated process requires seven stages and its two original drawings.');
    const prefix = `${container.id}-process-${plateIndex}`;
    const figure = (drawing, caption) => {
      const element = document.createElement('figure');
      element.innerHTML = drawing;
      const text = document.createElement('figcaption');
      text.textContent = caption;
      element.append(text);
      return element;
    };
    const scenes = [
      figure(requestDrawing(`${prefix}-request`), 'A request defines the area of interest, product and deadline.'),
      figure(planningDrawing(`${prefix}-planning`), 'Planning brings observation opportunities and operational resources together.'),
      figure(acquisitionDrawing(`${prefix}-acquisition`), originals[0].querySelector('figcaption').textContent),
      figure(downlinkDrawing(`${prefix}-downlink`), originals[1].querySelector('figcaption').textContent),
      figure(processingDrawing(`${prefix}-processing`), 'Measurements are prepared into a geospatial product.'),
      figure(qualityDrawing(`${prefix}-quality`), 'The product is checked before it can be accepted for delivery.'),
      figure(deliveryDrawing(`${prefix}-delivery`), 'The accepted product is delivered through controlled access.'),
    ];
    originals.forEach(element => {
      element.dataset.originalIllustration = '';
      element.classList.add('process-scene');
      element.hidden = true;
    });
    const status = document.createElement('p');
    status.className = 'sr-only';
    status.setAttribute('role', 'status');
    const instruction = document.createElement('p');
    instruction.className = 'process-instruction';
    instruction.textContent = 'Select a step to change the illustration. Conceptual sequence, not live mission progress.';
    map.before(instruction);
    map.after(status);
    const buttons = steps.map((step, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'process-step';
      button.id = `${prefix}-step-${index}`;
      button.setAttribute('aria-controls', `${prefix}-scene-${index}`);
      const copy = document.createElement('span');
      copy.className = 'process-step-copy';
      copy.append(...step.querySelector('div').childNodes);
      button.append(step.querySelector('.process-map-number'), copy);
      step.removeAttribute('tabindex');
      step.replaceChildren(button);
      const scene = scenes[index];
      scene.classList.add('process-scene');
      scene.id = `${prefix}-scene-${index}`;
      scene.setAttribute('role', 'region');
      scene.setAttribute('aria-labelledby', button.id);
      return button;
    });
    drawings.replaceChildren(...scenes, ...originals);
    plate.classList.add('process-illustrated');
    function select(index, announce = true) {
      buttons.forEach((button, current) => {
        const selected = current === index;
        button.setAttribute('aria-pressed', String(selected));
        steps[current].classList.toggle('is-current', selected);
        scenes[current].hidden = !selected;
      });
      if (announce) status.textContent = `${index + 1} of 7: ${buttons[index].querySelector('strong').textContent}. ${scenes[index].querySelector('figcaption').textContent}`;
    }
    buttons.forEach((button, index) => {
      button.addEventListener('click', () => select(index));
      button.addEventListener('keydown', event => {
        const next = {
          ArrowRight: (index + 1) % buttons.length,
          ArrowLeft: (index + buttons.length - 1) % buttons.length,
          Home: 0,
          End: buttons.length - 1,
        }[event.key];
        if (next === undefined) return;
        event.preventDefault();
        event.stopPropagation();
        buttons[next].focus({ preventScroll: true });
        const strip = map.getBoundingClientRect();
        const target = buttons[next].getBoundingClientRect();
        if (target.left < strip.left) map.scrollLeft -= strip.left - target.left;
        else if (target.right > strip.right) map.scrollLeft += target.right - strip.right;
        select(next);
      });
    });
    select(0, false);
  }
}
