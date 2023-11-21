# Mapbox
The map and all its layers are implemented using Mapbox JS.

All layers are hosted on Mapbox (currently in the account `evyatark3108@gmail.com`)

For a general explanation on Mapbox see here.

For a developer-oriented explanation how to use Mapbox in code, see these examples.

## Mapbox handling in code of PRCC

### Initialization of the Map
Initialization of the Map is done in src/app/map/map.component.ts

```typescript
  ngAfterViewInit() {
    this.mapboxService.init.subscribe(() => {
      this.initialize();
    });
  }

  initialize() {
    const mapParams: mapboxgl.MapboxOptions = {
      container: this.mapEl.nativeElement,
      style: this.STYLE,
      minZoom: 6.4,
      //zoom: 7,
      attributionControl: false,
      bounds: [[34.578046, 33.2], [35.356111, 30.8]],
      maxBounds: [[30, 27], [40, 38]],
      preserveDrawingBuffer: true,
    };
    this.map = new mapboxgl.Map(mapParams);
    ...
```

In general, note that `map.component.ts` (and other components) use Dependency Injection and Reactive Extensions.

`mapboxService` and other services are injected to this component in the constructor:
```typescript
  constructor(private mapboxService: MapboxService, private state: StateService,
              private router: Router, private api: ApiService) {
  }
```

The first part of method `initialize()` is very similar to the Mapbox examples in XYZ.

the `this.STYLE` constant, defined in the beginning of this class (`map.component.ts`), 
must be the exact URI (that is, a unique identifier) of the style given by the appropriate 
Mapbox account (currently `evyatark3108@gmail.com`).  
We currently use a "draft" style, but it makes no difference for the code if it uses a draft or public style.  
If you make the style (this one or a future other one) public (through the Mapbox account), make sure
to change the URI here in this code.

Together with the `this.STYLE` constant, we also have the `ACCESS_TOKEN` constant in `mapbox.service.ts`!
If you change a Mapbox account, you will need to change both constants!

