declare module 'bootstrap-vue/es/components/*' {
  import { VueConstructor }   from 'vue'
  const Component: VueConstructor
  export default Component
}

declare module 'bootstrap-vue/es/directives/*' {
  import { DirectiveOptions } from 'vue'
  const Directive: DirectiveOptions
  export default Directive
}
