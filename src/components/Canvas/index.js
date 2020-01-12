import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { space } from 'styled-system';

const Canvas = styled.canvas`
  position: absolute;
  ${space};
`;

const ConstellationCanvas = props => {
  const { width, height } = props;
  const drawLine = drawParameters => {
    const { context, particle, particle2 } = drawParameters;
    context.beginPath();
    context.moveTo(particle.x, particle.y);
    context.lineTo(particle2.x, particle2.y);
    context.stroke();
  };

  const animateConstellation = animateParameters => {
    const {
      context,
      constellationCanvas,
      maxParticles,
      particleSize,
      particles,
      threshold
    } = animateParameters;

    context.clearRect(0, 0, width, height);
    for (let i = 0; i < maxParticles; i += 1) {
      const particle = particles[i];
      context.fillRect(
        particle.x - particleSize / 2,
        particle.y - particleSize / 2,
        particleSize,
        particleSize
      );
      for (let j = 0; j < maxParticles; j += 1) {
        if (i !== j) {
          const particle2 = particles[j];
          const distanceX = Math.abs(particle.x - particle2.x);
          const distanceY = Math.abs(particle.y - particle2.y);
          if (distanceX < threshold && distanceY < threshold) {
            context.lineWidth = (threshold * 2 - (distanceX + distanceY)) / 50;
            const color1 = 71 - Math.floor(distanceX + distanceY);
            const color2 = 74 - Math.floor(distanceX + distanceY);
            const color3 = 81 - Math.floor(distanceX + distanceY);
            const opacity = 0.15;
            context.strokeStyle = `rgba(${color1},${color2},${color3},${opacity})`;
            context.fillStyle = `rgba(${color1},${color2},${color3},${opacity})`;
            context.lineWidth = `4`;
            drawLine({ context, particle, particle2 });
          }
        }
      }
      particle.x += particle.vx;
      particle.y += particle.vy;
      if (particle.x > width - particleSize || particle.x < particleSize)
        particle.vx = -particle.vx;
      if (particle.y > height - particleSize || particle.y < particleSize)
        particle.vy = -particle.vy;
    }
    window.requestAnimationFrame(
      animateConstellation.bind(this, {
        context,
        constellationCanvas,
        maxParticles,
        particleSize,
        particles,
        threshold
      })
    );
  };

  const constellationCanvas = useRef(null);

  useEffect(
    () => {
      const context = constellationCanvas.current.getContext('2d');

      context.save();

      const ratio = (width * height) / (1280 * 1920);
      const particles = [];
      const particleSize = 4;
      const maxParticles = Math.floor(250 * ratio);
      const threshold = 120;
      for (let i = 0; i < maxParticles; i += 1) {
        const particle = {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.random(),
          vy: Math.random()
        };
        particles.push(particle);
      }
      animateConstellation({
        constellationCanvas,
        context,
        particles,
        particleSize,
        maxParticles,
        threshold
      });
    },
    [width, height]
  );

  return (
    <Canvas innerRef={constellationCanvas} width={width} height={height} />
  );
};

ConstellationCanvas.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
};

ConstellationCanvas.defaultProps = {
  width: 1920,
  height: 1280
};

export default ConstellationCanvas;
