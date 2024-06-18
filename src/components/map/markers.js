import { DivIcon } from 'leaflet';
import React from 'react';
import { Marker } from 'react-leaflet';
import { useDispatch } from 'react-redux';
import ReactDomServer from 'react-dom/server';
import classnames from 'classnames';

import RescuerIcon from '../icons/Rescuer'
import ExclamationIcon from '../icons/Exclamation'
import DoctorIcon from '../icons/Doctor'
import PolicemanIcon from '../icons/Police'
import { actions } from './mapSlice';

const Arrow = ({ color }) => {
  const arrowStyle = [
    'w-0', 'h-0', 'block',
    'absolute', 'top-full', 'left-1/2',
    'translate-x-[-50%]',
    'border-solid',
    'border-l-[3px]', 'border-l-transparent',
    'border-t-[6px]',
    'border-r-[3px]', 'border-r-transparent',
  ];

  return <span className={classnames(arrowStyle, color)}></span>
}

const Dot = ({ color }) => {
  const dotStyle = ['absolute', 'bottom-[-10px]',
    'left-1/2', 'translate-x-[-50%]', 'block', 'w-1',
    'h-1', 'rounded-full', 'border', 'border-solid',
    'border-white'];

  return <span className={classnames(dotStyle, color)}></span>
}

const MarkerIcon = ({ color, children, selected }) => {
  const baseStyles = `rounded-full`;
  const baseSize = ['w-8', 'h-8'];
  const selectedSize = ['w-12', 'h-12'];
  const layoutStyle = ['flex', 'justify-center', 'items-center', 'relative', 'rounded-full'];

  const className = classnames(
    baseStyles,
    selected ? selectedSize : baseSize,
    layoutStyle,
    color,
  );

  return <div className={className}>{children}</div>
}

const CommonMarker = ({ id, type, position, selected, children, onClick }) => {
  const classMap = {
    event: {
      color: selected ? 'bg-red-800' : 'bg-red-500',
      borderColor: selected ? 'border-t-red-800' : 'border-t-red-500',
    },
    volunteer: {
      color: selected ? 'bg-primary-400' : 'bg-blue-500',
      borderColor: selected ? 'border-t-primary-400' : 'border-t-blue-500',
    },
  };
  const anchor = selected ? [24, 58] : [16, 42];
  const size = selected ? [48, 58] : [32, 42];

  const dispatch = useDispatch();

  const icon = new DivIcon({
    html: ReactDomServer.renderToString(
      <>
        <MarkerIcon color={classMap[type]?.color} selected={selected}>
          {children}
          <Arrow color={classMap[type]?.borderColor} />
          <Dot color={classMap[type]?.color} />
        </MarkerIcon>
      </>
    ),
    className: 'bg-transparent',
    iconSize: size,
    iconAnchor: anchor,
  })

  return <Marker
    eventHandlers={
      {
        click: () => {
          dispatch(actions.markerClick({ id, type, position }));
          onClick && onClick({ id, type, position });
        }
      }
    }
    position={position}
    icon={icon}></Marker>
}

/**
  * @param {Object} props
  * @param {Array<number>} props.position
  * @param {boolean} props.selected
  * @returns {JSX.Element}
  * @example <RescuerMarker position={[51.500, -0.1]} selected={true} />
*/
export const RescuerMarker = ({ id, position, selected, onClick }) => {
  const iconFill = 'fill-white';
  const iconSize = selected ? ['w-8', 'h-8'] : ['w-5', 'h-5'];

  return (
    <CommonMarker id={id} type="volunteer" position={position} selected={selected} onClick={onClick}>
      <RescuerIcon className={classnames(iconFill, iconSize)} />
    </CommonMarker>
  )
}

/**
  * @param {Object} props
  * @param {Array<number>} props.position
  * @param {boolean} props.selected
  * @returns {JSX.Element}
  * @example <MedicMarker position={[51.500, -0.1]} />
*/
export const MedicMarker = ({ id, position, selected, onClick }) => {
  const iconFill = 'fill-white';
  const iconSize = selected ? ['w-8', 'h-8'] : ['w-5', 'h-5'];

  return (
    <CommonMarker id={id} type="volunteer" position={position} selected={selected} onClick={onClick}>
      <DoctorIcon className={classnames(iconFill, iconSize)} />
    </CommonMarker>
  )

}
/**
  * @param {Object} props
  * @param {Array<number>} props.position
  * @param {boolean} props.selected
  * @returns {JSX.Element}
  * @example <PolicemanMarker position={[51.500, -0.1]} selected />
*/
export const PolicemanMarker = ({ id, position, selected, onClick }) => {
  const iconFill = 'fill-white';
  const iconSize = selected ? ['w-8', 'h-8'] : ['w-5', 'h-5'];

  return (
    <CommonMarker id={id} type="volunteer" position={position} selected={selected} onClick={onClick}>
      <PolicemanIcon className={classnames(iconFill, iconSize)} />
    </CommonMarker>
  )
}

/**
  * @param {Object} props
  * @param {Array<number>} props.position
  * @param {boolean} props.selected
  * @returns {JSX.Element}
  * @example <EventMarker position={[51.500, -0.1]} />
*/
export const EventMarker = ({ id, position, selected, onClick }) => {
  const iconFill = 'fill-white';
  const iconSize = selected ? ['w-8', 'h-8'] : ['w-5', 'h-5'];
  return (
    <CommonMarker id={id} type="event" position={position} selected={selected} onClick={onClick}>
      <ExclamationIcon className={classnames(iconFill, iconSize)} />
    </CommonMarker>
  )
}

