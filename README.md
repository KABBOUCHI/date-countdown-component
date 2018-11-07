# date-countdown-component

## Project setup
```
yarn install
```

### Compiles and minifies for production
```
yarn run build
```

### Usage

```html
<date-countdown until="2018-11-08">
	<template slot id="finished">
		<h4>Now Expired</h4>
	</template>

	<template slot id="main">
		<div>
			<span>
				<span data-days></span> Days,
			</span>
			<span>
				<span data-hours></span> Hours,
			</span>
			<span>
				<span data-minutes></span> Minutes,
			</span>
			<span>
				<span data-seconds></span> Seconds
			</span>
			<span>
            <span data-milliseconds></span> 
                Milliseconds
            </span>
		</div>
	</template>
</date-countdown>
```