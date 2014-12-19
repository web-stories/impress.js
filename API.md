### Javascript

The javascript API methods are exposed from the return of the `impress().init()` call.

#### impress( [ id ] [, element ] )

The constructor method that returns the **API Object**.

**id**  
Type: `String`

A string representing the id of the root element being used to start impress. Default to "impress".

**element**  
Type: `Element`

The root element being used to start impress.

### API Object

#### init()

Initializes impress.

#### next()

Go to the next step.

#### prev()

Go to the previous step.

#### goto( step, duration )

Go to a specific step.

**step**  
Type: `Number`

The zero-based index of the step to go to.

**duration**  
Type: `Number`

The duration in milliseconds for the animation to complete

#### support( fn )

Add a custom support rule using user agent sniffing to test for a faulty 3D support.

**fn**  
Type: `Function`  

A function that should return `true` if the current device succeeds to handle the whole presentation or `false` if it fails.  
The `fn` function is called with the first argument representing the `navigator.userAgent` value.

* If impress default support succeeds, but the custom support fails, then impress assumes the current device is not supported.
* If the impress default support fails, then impress assumes the current device is not supported, disregarding the custom support condition.

### Data Attributes

Additional information can be specified using `data-*` attributes.

### Impress root element

The element used for impress initialization.

**data-transition-duration**  
Type: `Number`  
Default: `1000`

Specify a duration in milliseconds for each step.

### Impress step element

Any individual step inside the root element.

**data-transition-duration**  
Type: `Number`

Specify a duration in milliseconds for the step.  
*Note*: This overrides the `data-transition-duration` declaration from the root element if present.

**data-x**  
Type: `Number`  
Default: `0`

The "x" position in which **the center** of the step element will be initially positioned relative to the whole presentation canvas.

**data-y**  
Type: `Number`  
Default: `0`

The "y" position in which **the center** of the step will be initially positioned relative to the whole presentation canvas.
