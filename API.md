### Javascript

The javascript API methods are exposed from the return of the `impress().init()` call.

### Base methods

#### impress( [ id ] [, element ] )

Method that returns the reference to the **impress context**.

**id**  
Type: `String`

A string representing the id of the root element being used to start impress. Default to "impress".

**element**  
Type: `Element`

The root element being used to start impress.

#### init()

Initializes impress into the given **impress context** and returns the **API object**.

### API Object

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
