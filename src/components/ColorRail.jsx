import React from 'react';
import styled from 'styled-components';

export default function ColorRail({
  colors = ['#e11d48','#f472b6','#fb923c','#facc15','#84cc16','#10b981','#0ea5e9','#3b82f6','#8b5cf6','#a78bfa']
}) {
  const copy = (hex) => {
    try {
      navigator.clipboard?.writeText(hex);
    } catch {}
  };

  return (
    <StyledWrapper>
      <div className="container-items">
        {colors.map((hex, i) => (
          <button
            key={i}
            className="item-color"
            aria-color={hex}
            style={{ ['--color']: hex }}
            onClick={() => copy(hex)}
            title={hex}
          />
        ))}
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .container-items {
    display: flex;
    gap: 8px;
    transform-style: preserve-3d;
    transform: perspective(1000px);
  }

  .item-color {
    position: relative;
    flex-shrink: 0;
    width: 32px;
    height: 40px;
    border: none;
    outline: none;
    cursor: pointer;
    background: transparent;
    transition: 500ms cubic-bezier(0.175, 0.885, 0.32, 1.1);

    &::after {
      position: absolute;
      content: "";
      inset: 0;
      width: 40px;
      height: 40px;
      background-color: var(--color);
      border-radius: 6px;
      transform: scale(1.2);
      pointer-events: none;
      transition: 500ms cubic-bezier(0.175, 0.885, 0.32, 1.1);
      box-shadow: 0 8px 24px rgba(2,6,23,.18);
      border: 1px solid rgba(15,23,42,.08);
    }

    &::before {
      position: absolute;
      content: attr(aria-color);
      left: 65%;
      bottom: 52px;
      font-size: 10px;
      line-height: 14px;
      transform: translateX(-50%);
      padding: 2px 6px;
      background-color: #ffffff;
      border: 1px solid rgba(15,23,42,.12);
      border-radius: 6px;
      pointer-events: none;
      opacity: 0;
      visibility: hidden;
      transition: 500ms cubic-bezier(0.175, 0.885, 0.32, 1.1);
      white-space: nowrap;
    }

    &:hover {
      transform: scale(1.5);
      z-index: 3;

      &::before {
        opacity: 1;
        visibility: visible;
      }
    }

    &:active::after { transform: scale(1.1); }
    &:focus::before { content: "✅Copy"; }
  }

  .item-color:hover + * { transform: scale(1.3); z-index: 2; }
  .item-color:hover + * + * { transform: scale(1.15); z-index: 1; }
  .item-color:has(+ *:hover) { transform: scale(1.3); z-index: 2; }
  .item-color:has(+ * + *:hover) { transform: scale(1.15); z-index: 1; }
`;
