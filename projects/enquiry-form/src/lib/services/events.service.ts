import { EventEmitter, Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventsService implements OnInit {
  constructor(
    
  ) {}

  ngOnInit(): void {}

  editSection = new EventEmitter<unknown>();
  duplicate = new EventEmitter<unknown>();
  delete = new EventEmitter<unknown>();
  changePosition = new EventEmitter<unknown>();
  addNewSectionClick = new EventEmitter<unknown>();
  changeContent = new EventEmitter<unknown>();
  restyleSection = new EventEmitter<unknown>();
  pageRedirectionButton = new EventEmitter<unknown>();
  buttonRedirection = new EventEmitter<unknown>();
  contactFormData = new EventEmitter<unknown>();
  //reference services

  backgroundImageChangeCheck = new EventEmitter<unknown>();
  colorOverlayChangeChecks = new EventEmitter<unknown>();
  alignmentChangeChecks = new EventEmitter<unknown>();
  animationChangeChecks = new EventEmitter<unknown>();
  spacingChangeChecks = new EventEmitter<unknown>();
  borderChangeChecks = new EventEmitter<unknown>();
  cardSizeChangeChecks = new EventEmitter<unknown>();
  imageStyleChangeChecks = new EventEmitter<unknown>();
  cornerChangeChecks = new EventEmitter<unknown>();
  textBackgroundChangeChecks = new EventEmitter<unknown>();
  buttonStyleChangeChecks = new EventEmitter<unknown>();
  postionLayoutChangeChecks = new EventEmitter<unknown>();
  contentAlignmentChangeCheck = new EventEmitter<unknown>();
  objectPositionChangeCheck = new EventEmitter<unknown>();
  locationChangeCheck = new EventEmitter<unknown>();
  mapStyleChangeCheck = new EventEmitter<unknown>();
  textSizeChangeCheck = new EventEmitter<unknown>();
  blogByIdEvent = new EventEmitter<unknown>();
  openBlogListEvent = new EventEmitter<unknown>();
  toggleEditorEvent = new EventEmitter<boolean>();
  closeEditorEvent = new EventEmitter<false>();
  wrapDirection = new EventEmitter<string>();

  stopCarouselEvent = new EventEmitter<any>();
  // Ecommerce event emitter
  redirectToPage = new EventEmitter<unknown>();
  addToCart = new EventEmitter<unknown>();
  placeOrder = new EventEmitter<unknown>();
  featureCollectionList = new EventEmitter<unknown>();
  environmentType = new EventEmitter<string>();
  categoryProductList = new EventEmitter<string>();
  collectionsListEvent = new EventEmitter<string[]>();
  categoryListEvent = new EventEmitter<string>();

  showLoadingScreen = new EventEmitter<boolean>();

  cashFreeEvent = new EventEmitter<unknown>();
  addressAddedIdx = new EventEmitter<number>();
  showBagIcon = new EventEmitter<boolean>();
}
