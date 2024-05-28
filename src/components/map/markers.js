import { DivIcon } from 'leaflet';
import React from 'react';
import { Marker } from 'react-leaflet';
import ReactDomServer from 'react-dom/server';
import classnames from 'classnames';

import RescuerIcon from '../icons/Rescuer'
import SvgExclamation from '../icons/Exclamation'
import DoctorIcon from '../icons/Doctor'
import PolicemanIcon from '../icons/Police'

const Arrow = ({ color }) => {
  const colors = {
    blue: 'border-t-blue-500',
    red: 'border-t-red-500',
  }
  const arrowStyle = [
    'w-0', 'h-0', 'block',
    'absolute', 'top-full', 'left-1/2',
    'translate-x-[-50%]',
    'border-solid',
    'border-l-[3px]', 'border-l-transparent',
    'border-t-[6px]',
    'border-r-[3px]', 'border-r-transparent',
  ];

  return <span className={classnames(arrowStyle, colors[color])}></span>
}

const Dot = ({ color }) => {
  const colors = {
    blue: 'bg-blue-500',
    red: 'bg-red-500',
  }
  const dotStyle = ['absolute', 'bottom-[-10px]',
    'left-1/2', 'translate-x-[-50%]', 'block', 'w-1',
    'h-1', 'rounded-full', 'border', 'border-solid',
    'border-white'];

  return <span className={classnames(dotStyle, colors[color])}></span>
}

const MarkerIcon = ({ color, children }) => {
  const colors = {
    blue: 'bg-blue-500',
    red: 'bg-red-500',
  }
  const baseStyles = `rounded-full`;
  const baseSize = ['w-8', 'h-8'];
  const layoutStyle = ['flex', 'justify-center', 'items-center', 'relative', 'rounded-full'];

  const className = classnames(
    baseStyles,
    baseSize,
    layoutStyle,
    colors[color],
  );

  return <div className={className}>{children}</div>
}

/**
  * @param {Object} props
  * @param {Array<number>} props.position
  * @returns {JSX.Element}
  * @example <RescuerMarker position={[51.500, -0.1]} />
*/
export const RescuerMarker = ({ position }) => {
  const color = 'blue';
  const icon = new DivIcon({
    html: ReactDomServer.renderToString(
      <>
        <MarkerIcon color={color}>
          <RescuerIcon className="fill-white w-6 h-6" />
          <Arrow color={color} />
          <Dot color={color} />
        </MarkerIcon>
      </>
    ),
    className: 'w-8 h-8 bg-transparent',
    iconAnchor: [24, 12]
  })

  return <Marker position={position} icon={icon}></Marker>
}

/**
  * @param {Object} props
  * @param {Array<number>} props.position
  * @returns {JSX.Element}
  * @example <MedicMarker position={[51.500, -0.1]} />
*/
export const MedicMarker = ({ position }) => {
  const color = 'blue';
  const icon = new DivIcon({
    html: ReactDomServer.renderToString(
      <>
        <MarkerIcon color={color}>
          <DoctorIcon className="fill-white w-6 h-6" />
          <Arrow color={color} />
          <Dot color={color} />
        </MarkerIcon>
      </>
    ),
    className: 'w-8 h-8 bg-transparent',
    iconAnchor: [24, 12]
  })

  return <Marker position={position} icon={icon}></Marker>
}

/**
  * @param {Object} props
  * @param {Array<number>} props.position
  * @returns {JSX.Element}
  * @example <PolicemanMarker position={[51.500, -0.1]} />
*/
export const PolicemanMarker = ({ position }) => {
  const color = 'blue';
  const icon = new DivIcon({
    html: ReactDomServer.renderToString(
      <>
        <MarkerIcon color={color}>
          <PolicemanIcon className="fill-white w-6 h-6" />
          <Arrow color={color} />
          <Dot color={color} />
        </MarkerIcon>
      </>
    ),
    className: 'w-8 h-8 bg-transparent',
    iconAnchor: [24, 12]
  })

  return <Marker position={position} icon={icon}></Marker>
}

/**
  * @param {Object} props
  * @param {Array<number>} props.position
  * @returns {JSX.Element}
  * @example <EventMarker position={[51.500, -0.1]} />
*/
export const EventMarker = ({ position }) => {
  const color = 'red';
  const icon = new DivIcon({
    html: ReactDomServer.renderToString(
      <>
        <MarkerIcon color={color}>
          <SvgExclamation className="fill-white w-6 h-6" />
          <Arrow color={color} />
          <Dot color={color} />
        </MarkerIcon>
      </>
    ),
    className: 'w-8 h-8 bg-transparent',
    iconAnchor: [24, 12]
  })

  return <Marker position={position} icon={icon}></Marker>
}
