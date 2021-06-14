import React from 'react';

export interface MenuItemProps {
  active: boolean;
  onClick?: React.MouseEventHandler<SVGCircleElement>;
}
