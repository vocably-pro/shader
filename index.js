const nameElement = document.querySelector('#name');
const colorElement = document.querySelector('#color');
const stepElement = document.querySelector('#step');
const resultElement = document.querySelector('#result');

const build = () => {
  const name = nameElement.value;
  const colorString = colorElement.value;
  const step = parseFloat(stepElement.value);

  if (!name || !colorString || !step) {
    return;
  }

  const palette = [
    {
      degree: 0,
      color: tinycolor(colorString),
    },
  ];

  for (let degree = step; degree < 50; degree += step) {
    palette.unshift({
      degree: -degree,
      color: tinycolor(colorString).darken(degree),
    });
    palette.push({
      degree,
      color: tinycolor(colorString).lighten(degree),
    });
  }

  const bullshitStep = step * 10;
  resultElement.innerHTML = '';

  for (let format of ['hex', 'rgb']) {
    let degree = bullshitStep;
    const formatContainer = document.createElement('div');
    formatContainer.innerHTML = `<div class="text-muted ${
      format !== 'hex' ? 'mt-5' : ''
    }">/* ${format} */</div>`;

    for (let element of palette) {
      const variant = document.createElement('div');
      variant.classList.add('variant');
      variant.innerHTML = `<span class="color">\$${name}-${degree}: ${element.color.toString(
        format
      )};</span>`;
      variant.style.setProperty('--color', element.color.toString());
      formatContainer.appendChild(variant);
      degree += bullshitStep;
    }

    resultElement.appendChild(formatContainer);
  }
};

build();

nameElement.addEventListener('keyup', build);
colorElement.addEventListener('keyup', build);
stepElement.addEventListener('keyup', build);

document.querySelector('#year').innerHTML = new Date().getFullYear();
