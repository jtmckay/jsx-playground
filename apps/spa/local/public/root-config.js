System.register(["single-spa","single-spa-layout"],function(s,u){"use strict";var a,t,o,i,p;return{setters:[n=>{a=n.registerApplication,t=n.start},n=>{o=n.constructRoutes,i=n.constructApplications,p=n.constructLayoutEngine}],execute:function(){const e=o(`<single-spa-router>
  <!--

    This is the single-spa Layout Definition for your microfrontends.
    See https://single-spa.js.org/docs/layout-definition/ for more information.

  -->

  <main style="display: flex; flex-direction: column; min-height: 100vh">
    <route default>
      <application name="@playground/header"></application>
      <application name="@playground/playground"></application>
      <application name="@playground/footer"></application>
    </route>
    <!-- <route path="app">
      <application name="@playground/header"></application>
      <application name="@playground/playground"></application>
      <application name="@playground/footer"></application>
    </route>
    <route path="login">
      <application name="@playground/header"></application>
      <application name="@playground/authentication"></application>
      <application name="@playground/footer"></application>
    </route>
    <route path="access">
      <application name="@playground/header"></application>
      <application name="@playground/authorization"></application>
      <application name="@playground/footer"></application>
    </route> -->
  </main>
</single-spa-router>
`),r=i({routes:e,loadApp({name:l}){return System.import(l)}}),c=p({routes:e,applications:r});r.forEach(a),c.activate(),t()}}});
