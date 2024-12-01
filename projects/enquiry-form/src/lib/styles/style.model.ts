
import { AlignContent, Corners, ImageFit, ImageRatio, OverlayValue, RedirectionLinkType, SPACING, TEXT_SIZE, TextPosition } from '.';
import {
  ALIGN,
  ANIMATION_DIRECTION,
  ANIMATION_SPEED,
  BUTTON_SHAPE,
  BUTTON_TYPE,
  CARD_SIZE,
  FIT,
  LAYOUTPOSITION,
  LINK_TYPE,
  SPACING_TYPE,
  CONTENTPOSITION,
  BORDER_DIRECTION
} from './types';

export interface SpacingModel {
  top: SPACING_TYPE;
  bottom: SPACING_TYPE;
}
export interface PositionModel {
  x: number;
  y: number;
}
export interface BorderModel {
  display: boolean;
  color: string;
  type: string;
  thickness: string;
  direction?: BORDER_DIRECTION[];
  radius?: number;
}

export interface DeviderModel {
  display: boolean;
}

export interface LayOutModel {
  align: ALIGN;
  fit: FIT;
  headingSpacing?: SPACING;
  spacing: SpacingModel;
  spacingHorizontal?: SPACING_TYPE
}

export interface BannerLayOutModel{
  layoutAlignment : PositionLayoutModal;
  contentAlignment:contentAlignmentModal;
  fit : FIT;
  spacing : SpacingModel;
  bannerImageDisplay : boolean;
}

export interface contentAlignmentModal{
  label:string,
  value:CONTENTPOSITION,
  types:[]
}

export interface PositionLayoutModal{
  label:string,
  value:LAYOUTPOSITION,
  types:["left","right","top","bottom"]
}
export interface BackgroundModel {
  color: string;
  accentColor: string
  image: string;
  altName: string;
  opacity: number;
  showImage: boolean;
  position: PositionModel;
  blur?: keyof typeof OverlayValue;
  overlay?: OverlayValue
}
export interface AnimationModel {
  type: ANIMATION_DIRECTION;
  speed: ANIMATION_SPEED;
}
export interface StylesModel {
  layout: LayOutModel;
  background: BackgroundModel;
  animation: AnimationModel;
  border: BorderModel;
  devider: DeviderModel;
  dividerImage?: DividerImage;
}

export interface DividerImage {
  url: string;
  showDivider: boolean;
}
export interface DisplaySection {
  showHeading : boolean;
  showContent : boolean;
  showImage : boolean;
  showLink : boolean;
  linkType: LINK_TYPE;
}

export interface Button{
  linkType : RedirectionLinkType;
  label: string;
  redirectionUrl: string;
  pageId: string;
  newTab: boolean;
}

export interface NavbarButton{
  label: string;
  redirectionUrl: string;
  status:boolean;
  pageId: string;
  showHeader: boolean;
  folder: Folder;
}

export interface Folder {
  folderId: string;
  pages: Page[];
}
export interface Page {
  label: string;
  pageId: any;
  redirectionUrl : string;
}

export interface ListItemModal<T> {
  label: string;
  data: T[];
}

export interface CardStyles {
  image: ImageStyle;
  corners: Corners;
  size: CARD_SIZE;
  textPosition: TextPosition
  textBackground: TextBackground;
}

export interface TextBackground {
  color: string;
  amount: number;
}

export interface ImageStyle {
  fit: ImageFit;
  ratio: ImageRatio;
}
export interface BannerStylesModel {
  layout: LayOutModel;
  positionLayout: PositionLayoutModal;
  contentAlignment: AlignContent;
  borderLessImage: boolean;
  background: BackgroundModel;
  animation: AnimationModel;
  border: BorderModel;
  devider: DeviderModel;
  image:ImageStyle;
  corners: Corners;
  merge?: boolean;
  textSize: TextSize;
  showImage:boolean;
  revertImage: boolean;
}

export interface InputTextModel {
  label: string;
  value: string;
  isRTE: boolean;
}

export interface Image {
  id: string;
  url: string;
  blurhash: string;
  altText: string;
  position : PositionModel;
}
export interface Icon {
  url: string;
  color: string;
}

export interface ButtonStyleModel {
  type: BUTTON_TYPE;
  shape: BUTTON_SHAPE;
}

export interface HeaderButtonStyleModel{
  color:string,
  boldColor: string,
  backgroundColor:string,
  subtleColor:string
}

export interface ActionModel {
  display: boolean;
  buttons: ButtonModel[];
}
export interface ButtonModel {
  id: string;
  content: Button;
  styles: ButtonStyleModel;
}

export interface HeaderButtonModel{
  id : string
  content : NavbarButton,
  styles:HeaderButtonStyleModel
}

export interface TextSize {
  heading: TEXT_SIZE;
  desc: TEXT_SIZE;
}
