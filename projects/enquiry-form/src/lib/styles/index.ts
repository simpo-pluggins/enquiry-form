/* eslint-disable @typescript-eslint/no-unused-vars */

import { SpacingModel } from './style.model';

/* eslint-disable @typescript-eslint/no-explicit-any */
export enum Style {
  content = 'CONTENT',
  screen = 'SCREEN',
}

export enum SPACING {
  none = '1.5rem',
  small = '3rem',
  medium = '5rem',
  large = '6rem',
  remove = '0rem'
}

export interface Contet {
  display: 'flex';
  'justify-content': 'center';
  'align-items': 'center';
  height: '100%';
}
export interface Screen {
  display: 'flex';
  'justify-content': 'center';
  'align-items': 'center';
  'min-height': 'calc(95vh - 0px)';
}

export enum BANNERALIGNMENT {
  left = "flex-lg-row",
  right = "flex-lg-row-reverse",
  top = "flex-lg-column",
  bottom = "flex-lg-column-reverse"
}
export enum SPACINGALIGN {
  large = "8rem",
  medium = "6rem",
  small = "2rem",
  none = "0rem"
}
export enum BANNERHALIGN{
  left = 'justify-content-start text-start',
  center = 'justify-content-center text-center',
  right = 'justify-content-end text-end',
}
export enum HALIGN {
  left = 'text-align: left',
  center = 'text-align: center',
  right = 'text-align: right',
}
export enum VALIGN {
  left = 'text-align: top',
  center = 'text-align: center',
  right = 'text-align: bottom',
}

export enum Padding {
  top = 'padding-top',
  bottom = 'padding-bottom',
}

export const animation = {
  type: {
    top: 'w3-animate-top',
    bottom: 'w3-animate-bottom',
    left: 'w3-animate-left',
    right: 'w3-animate-right',
    fadeIn: 'w3-animate-opacity',
    zoom: 'w3-animate-zoom',
    none: 'none'
  },
  speed: {
    slow: '3s',
    medium: '2s',
    fast: '1s',
  },
};
export enum HEADER_STYLING {
  LOGO_LEFT__MENU_RIGHT = "LOGO_LEFT__MENU_RIGHT",
  LOGO_CENTER__MENU_LEFT = "LOGO_CENTER__MENU_LEFT",
  LOGO_RIGHT__MENU_LEFT = "LOGO_RIGHT__MENU_LEFT"
}
export enum TEXT_SIZE {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
  ExtraLarge = 'Extra_Large'
}

export const fontSize = {
  heading: {
    Small : 'heading-fs-small',
    Medium : 'heading-fs-medium',
    Large : 'heading-fs-large',
    Extra_Large : 'heading-fs-xlarge'
  },
  desc : {
    Small : 'desc-fs-small',
    Medium : 'desc-fs-medium',
    Large : 'desc-fs-large',
    Extra_Large : 'desc-fs-xlarge'
  }
}

export const mapStyle = {
  Streets : 'streets-v12',
  Outdoors: 'outdoors-v12',
  Light: 'light-v11',
  Dark: 'dark-v11',
  Satellite: 'satellite-v9',
  Satellite_street: 'satellite-streets-v12',
  navigation_day: 'navigation-day-v1',
  navigation_night : 'navigation-night-v1'
}

export const contentAlignment ={
  top:'justify-content-start',
  center:'justify-content-center',
  bottom:'justify-content-end'
}
// export const bannerAlignment = (element : any) => {

// }
export const fitContent = (element: any) => {
  const style: Contet = {
    display: 'flex',
    'justify-content': 'center',
    'align-items': 'center',
    height: '100%',
  };
  applyStyle(element, style);
};

export const fitScreen = (element: any) => {
  const style: Screen = {
    display: 'flex',
    'justify-content': 'center',
    'align-items': 'center',
    'min-height': 'calc(95vh - 0px)',
  };
  applyStyle(element, style);
};
export const applyStyle = (element: any, styleObj: any) => {
  Object.entries(styleObj).forEach(([styleName, styleValue]) => {
    element.style.setProperty(styleName, styleValue);
  });
};

export const applySpacing = (element: any, space?: SpacingModel) => {
  if (space?.top) {
    element.style.setProperty(
      Padding.top,
      SPACING[space.top as keyof typeof SPACING]
    );
  }
  if (space?.bottom) {
    element.style.setProperty(
      Padding.bottom,
      SPACING[space.bottom as keyof typeof SPACING]
    );
  }
};

export enum RedirectionLinkType {
  Page = 'Page',
  External = 'External',
  Email = 'Email',
  Phone = 'Phone',
  section = 'Section'
}

export enum Corners {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
  None = 'None'
}

export enum ProductCardTheme {
  Theme1 = "Theme1",
  Theme2 = "Theme2"
}

// SOME CHANGES BY ME

export enum logoType{
  Basic = 'Basic',
  Boxed = 'Boxed'
}
export enum showCaseType {
  Carousal = 'Carousal',
  Grid = 'Grid'
}
export enum logoSpeed{
  Slow = '4s',
  Normal =  '3s',
  Fast =  '2s',
  VeryFast = '1s'
}

export enum logoDirection{
  Left = 'Left',
  Right = 'Right',
}


export enum TextPosition {
  BELOW_IMAGE = 'Below image',
  TOP_OF_IMAGE = 'On top of image',
  COVERING_IMAGE = 'Covering image'
}

export enum ImageFit {
  Cover = 'Cover',
  Contain = 'Contain'
}

export enum ImageRatio {
  SQUARE = '1:1',
  PORTRAIT = '2:3',
  LANDSCAPE = '3:2',
  WIDESCREEN = '16:9'
}
export enum AlignContent {
  Image_TOP = 'top',
  Image_CENTER = 'center',
  Image_BOTTOM = 'bottom'
}


export enum ChannelType {
  FACEBOOK = 'Facebook',
  TWITTER = 'Twitter',
  LINKEDIN = "LinkedIn",
  YOUTUBE = 'Youtube',
  INSTAGRAM = 'Instagram',
  TELEGRAM = "Telegram",
  THREADS = "Threads"
}

export enum OverlayValue {
  NONE = '0px',
  LIGHT = '2px',
  MODERATE = '4px',
  STRONG = '8px',
  VERY_STRONG = '16px'
}



export enum FooterTypes {
  SPLIT_DETAILS_RIGHT = 'Split Details Right',
  SPLIT_DETAILS_LEFT = "Split Details Left",
  STACKED_DETAILS_RIGHT = "Stacked Details Right",
  STACKED_DETAILS_CENTER = "Stacked Details Center",
  STACKED_DETAILS_LEFT = "Stacked Details Left",
  SIMPLE_DETAILS_RIGHT = "Simple Details Right",
  SIMPLE_DETAILS_CENTER = "Simple Details Center"
}

export enum HeaderButtonStyle {
  TAB = 'Tab',
  ROUND_SUBTLE = "Round subtle",
  ROUND_BOLD = "Round bold",
  SQUARE_SUBTLE = "Square subtle",
  SQUARE_BOLD = "Square bold"
}

export enum MapType {
  INLINE_MAP = 'Inline map',
  BACKGROUND_MAP = 'Background map'
}
