System.register([], function (Kr, QO) {
  'use strict';
  return {
    execute: function () {
      var v =
          typeof globalThis < 'u'
            ? globalThis
            : typeof window < 'u'
            ? window
            : typeof global < 'u'
            ? global
            : typeof self < 'u'
            ? self
            : {},
        qi = {},
        cu = {
          get exports() {
            return qi;
          },
          set exports(e) {
            qi = e;
          },
        },
        zi = {},
        F = {},
        ke = {},
        E = {};
      Object.defineProperty(E, '__esModule', { value: !0 }),
        (E.isFunction = void 0);
      function lu(e) {
        return typeof e == 'function';
      }
      E.isFunction = lu;
      var R = {},
        tr = {},
        J = {};
      Object.defineProperty(J, '__esModule', { value: !0 }),
        (J.createErrorClass = void 0);
      function fu(e) {
        var t = function (n) {
            Error.call(n), (n.stack = new Error().stack);
          },
          r = e(t);
        return (
          (r.prototype = Object.create(Error.prototype)),
          (r.prototype.constructor = r),
          r
        );
      }
      (J.createErrorClass = fu),
        Object.defineProperty(tr, '__esModule', { value: !0 }),
        (tr.UnsubscriptionError = void 0);
      var su = J;
      tr.UnsubscriptionError = su.createErrorClass(function (e) {
        return function (r) {
          e(this),
            (this.message = r
              ? r.length +
                ` errors occurred during unsubscription:
` +
                r.map(function (n, i) {
                  return i + 1 + ') ' + n.toString();
                }).join(`
  `)
              : ''),
            (this.name = 'UnsubscriptionError'),
            (this.errors = r);
        };
      });
      var B = {};
      Object.defineProperty(B, '__esModule', { value: !0 }),
        (B.arrRemove = void 0);
      function vu(e, t) {
        if (e) {
          var r = e.indexOf(t);
          0 <= r && e.splice(r, 1);
        }
      }
      B.arrRemove = vu;
      var xi =
          (v && v.__values) ||
          function (e) {
            var t = typeof Symbol == 'function' && Symbol.iterator,
              r = t && e[t],
              n = 0;
            if (r) return r.call(e);
            if (e && typeof e.length == 'number')
              return {
                next: function () {
                  return (
                    e && n >= e.length && (e = void 0),
                    { value: e && e[n++], done: !e }
                  );
                },
              };
            throw new TypeError(
              t ? 'Object is not iterable.' : 'Symbol.iterator is not defined.'
            );
          },
        Bi =
          (v && v.__read) ||
          function (e, t) {
            var r = typeof Symbol == 'function' && e[Symbol.iterator];
            if (!r) return e;
            var n = r.call(e),
              i,
              a = [],
              o;
            try {
              for (; (t === void 0 || t-- > 0) && !(i = n.next()).done; )
                a.push(i.value);
            } catch (u) {
              o = { error: u };
            } finally {
              try {
                i && !i.done && (r = n.return) && r.call(n);
              } finally {
                if (o) throw o.error;
              }
            }
            return a;
          },
        Di =
          (v && v.__spreadArray) ||
          function (e, t) {
            for (var r = 0, n = t.length, i = e.length; r < n; r++, i++)
              e[i] = t[r];
            return e;
          };
      Object.defineProperty(R, '__esModule', { value: !0 }),
        (R.isSubscription = R.EMPTY_SUBSCRIPTION = R.Subscription = void 0);
      var nr = E,
        fi = tr,
        Yi = B,
        si = (function () {
          function e(t) {
            (this.initialTeardown = t),
              (this.closed = !1),
              (this._parentage = null),
              (this._finalizers = null);
          }
          return (
            (e.prototype.unsubscribe = function () {
              var t, r, n, i, a;
              if (!this.closed) {
                this.closed = !0;
                var o = this._parentage;
                if (o)
                  if (((this._parentage = null), Array.isArray(o)))
                    try {
                      for (var u = xi(o), l = u.next(); !l.done; l = u.next()) {
                        var c = l.value;
                        c.remove(this);
                      }
                    } catch (b) {
                      t = { error: b };
                    } finally {
                      try {
                        l && !l.done && (r = u.return) && r.call(u);
                      } finally {
                        if (t) throw t.error;
                      }
                    }
                  else o.remove(this);
                var f = this.initialTeardown;
                if (nr.isFunction(f))
                  try {
                    f();
                  } catch (b) {
                    a = b instanceof fi.UnsubscriptionError ? b.errors : [b];
                  }
                var s = this._finalizers;
                if (s) {
                  this._finalizers = null;
                  try {
                    for (var d = xi(s), p = d.next(); !p.done; p = d.next()) {
                      var m = p.value;
                      try {
                        Gi(m);
                      } catch (b) {
                        (a = a ?? []),
                          b instanceof fi.UnsubscriptionError
                            ? (a = Di(Di([], Bi(a)), Bi(b.errors)))
                            : a.push(b);
                      }
                    }
                  } catch (b) {
                    n = { error: b };
                  } finally {
                    try {
                      p && !p.done && (i = d.return) && i.call(d);
                    } finally {
                      if (n) throw n.error;
                    }
                  }
                }
                if (a) throw new fi.UnsubscriptionError(a);
              }
            }),
            (e.prototype.add = function (t) {
              var r;
              if (t && t !== this)
                if (this.closed) Gi(t);
                else {
                  if (t instanceof e) {
                    if (t.closed || t._hasParent(this)) return;
                    t._addParent(this);
                  }
                  (this._finalizers =
                    (r = this._finalizers) !== null && r !== void 0
                      ? r
                      : []).push(t);
                }
            }),
            (e.prototype._hasParent = function (t) {
              var r = this._parentage;
              return r === t || (Array.isArray(r) && r.includes(t));
            }),
            (e.prototype._addParent = function (t) {
              var r = this._parentage;
              this._parentage = Array.isArray(r)
                ? (r.push(t), r)
                : r
                ? [r, t]
                : t;
            }),
            (e.prototype._removeParent = function (t) {
              var r = this._parentage;
              r === t
                ? (this._parentage = null)
                : Array.isArray(r) && Yi.arrRemove(r, t);
            }),
            (e.prototype.remove = function (t) {
              var r = this._finalizers;
              r && Yi.arrRemove(r, t), t instanceof e && t._removeParent(this);
            }),
            (e.EMPTY = (function () {
              var t = new e();
              return (t.closed = !0), t;
            })()),
            e
          );
        })();
      (R.Subscription = si), (R.EMPTY_SUBSCRIPTION = si.EMPTY);
      function du(e) {
        return (
          e instanceof si ||
          (e &&
            'closed' in e &&
            nr.isFunction(e.remove) &&
            nr.isFunction(e.add) &&
            nr.isFunction(e.unsubscribe))
        );
      }
      R.isSubscription = du;
      function Gi(e) {
        nr.isFunction(e) ? e() : e.unsubscribe();
      }
      var le = {};
      Object.defineProperty(le, '__esModule', { value: !0 }),
        (le.config = void 0),
        (le.config = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        });
      var ir = {},
        vi = {};
      (function (e) {
        var t =
            (v && v.__read) ||
            function (n, i) {
              var a = typeof Symbol == 'function' && n[Symbol.iterator];
              if (!a) return n;
              var o = a.call(n),
                u,
                l = [],
                c;
              try {
                for (; (i === void 0 || i-- > 0) && !(u = o.next()).done; )
                  l.push(u.value);
              } catch (f) {
                c = { error: f };
              } finally {
                try {
                  u && !u.done && (a = o.return) && a.call(o);
                } finally {
                  if (c) throw c.error;
                }
              }
              return l;
            },
          r =
            (v && v.__spreadArray) ||
            function (n, i) {
              for (var a = 0, o = i.length, u = n.length; a < o; a++, u++)
                n[u] = i[a];
              return n;
            };
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.timeoutProvider = void 0),
          (e.timeoutProvider = {
            setTimeout: function (n, i) {
              for (var a = [], o = 2; o < arguments.length; o++)
                a[o - 2] = arguments[o];
              var u = e.timeoutProvider.delegate;
              return u?.setTimeout
                ? u.setTimeout.apply(u, r([n, i], t(a)))
                : setTimeout.apply(void 0, r([n, i], t(a)));
            },
            clearTimeout: function (n) {
              var i = e.timeoutProvider.delegate;
              return (i?.clearTimeout || clearTimeout)(n);
            },
            delegate: void 0,
          });
      })(vi),
        Object.defineProperty(ir, '__esModule', { value: !0 }),
        (ir.reportUnhandledError = void 0);
      var bu = le,
        pu = vi;
      function mu(e) {
        pu.timeoutProvider.setTimeout(function () {
          var t = bu.config.onUnhandledError;
          if (t) t(e);
          else throw e;
        });
      }
      ir.reportUnhandledError = mu;
      var W = {};
      Object.defineProperty(W, '__esModule', { value: !0 }), (W.noop = void 0);
      function hu() {}
      W.noop = hu;
      var X = {};
      Object.defineProperty(X, '__esModule', { value: !0 }),
        (X.createNotification =
          X.nextNotification =
          X.errorNotification =
          X.COMPLETE_NOTIFICATION =
            void 0),
        (X.COMPLETE_NOTIFICATION = (function () {
          return Qr('C', void 0, void 0);
        })());
      function yu(e) {
        return Qr('E', void 0, e);
      }
      X.errorNotification = yu;
      function _u(e) {
        return Qr('N', e, void 0);
      }
      X.nextNotification = _u;
      function Qr(e, t, r) {
        return { kind: e, value: t, error: r };
      }
      X.createNotification = Qr;
      var fe = {};
      Object.defineProperty(fe, '__esModule', { value: !0 }),
        (fe.captureError = fe.errorContext = void 0);
      var Ki = le,
        me = null;
      function gu(e) {
        if (Ki.config.useDeprecatedSynchronousErrorHandling) {
          var t = !me;
          if ((t && (me = { errorThrown: !1, error: null }), e(), t)) {
            var r = me,
              n = r.errorThrown,
              i = r.error;
            if (((me = null), n)) throw i;
          }
        } else e();
      }
      fe.errorContext = gu;
      function Ou(e) {
        Ki.config.useDeprecatedSynchronousErrorHandling &&
          me &&
          ((me.errorThrown = !0), (me.error = e));
      }
      (fe.captureError = Ou),
        (function (e) {
          var t =
            (v && v.__extends) ||
            (function () {
              var _ = function (O, S) {
                return (
                  (_ =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (j, A) {
                        j.__proto__ = A;
                      }) ||
                    function (j, A) {
                      for (var P in A)
                        Object.prototype.hasOwnProperty.call(A, P) &&
                          (j[P] = A[P]);
                    }),
                  _(O, S)
                );
              };
              return function (O, S) {
                if (typeof S != 'function' && S !== null)
                  throw new TypeError(
                    'Class extends value ' +
                      String(S) +
                      ' is not a constructor or null'
                  );
                _(O, S);
                function j() {
                  this.constructor = O;
                }
                O.prototype =
                  S === null
                    ? Object.create(S)
                    : ((j.prototype = S.prototype), new j());
              };
            })();
          Object.defineProperty(e, '__esModule', { value: !0 }),
            (e.EMPTY_OBSERVER = e.SafeSubscriber = e.Subscriber = void 0);
          var r = E,
            n = R,
            i = le,
            a = ir,
            o = W,
            u = X,
            l = vi,
            c = fe,
            f = (function (_) {
              t(O, _);
              function O(S) {
                var j = _.call(this) || this;
                return (
                  (j.isStopped = !1),
                  S
                    ? ((j.destination = S), n.isSubscription(S) && S.add(j))
                    : (j.destination = e.EMPTY_OBSERVER),
                  j
                );
              }
              return (
                (O.create = function (S, j, A) {
                  return new m(S, j, A);
                }),
                (O.prototype.next = function (S) {
                  this.isStopped
                    ? g(u.nextNotification(S), this)
                    : this._next(S);
                }),
                (O.prototype.error = function (S) {
                  this.isStopped
                    ? g(u.errorNotification(S), this)
                    : ((this.isStopped = !0), this._error(S));
                }),
                (O.prototype.complete = function () {
                  this.isStopped
                    ? g(u.COMPLETE_NOTIFICATION, this)
                    : ((this.isStopped = !0), this._complete());
                }),
                (O.prototype.unsubscribe = function () {
                  this.closed ||
                    ((this.isStopped = !0),
                    _.prototype.unsubscribe.call(this),
                    (this.destination = null));
                }),
                (O.prototype._next = function (S) {
                  this.destination.next(S);
                }),
                (O.prototype._error = function (S) {
                  try {
                    this.destination.error(S);
                  } finally {
                    this.unsubscribe();
                  }
                }),
                (O.prototype._complete = function () {
                  try {
                    this.destination.complete();
                  } finally {
                    this.unsubscribe();
                  }
                }),
                O
              );
            })(n.Subscription);
          e.Subscriber = f;
          var s = Function.prototype.bind;
          function d(_, O) {
            return s.call(_, O);
          }
          var p = (function () {
              function _(O) {
                this.partialObserver = O;
              }
              return (
                (_.prototype.next = function (O) {
                  var S = this.partialObserver;
                  if (S.next)
                    try {
                      S.next(O);
                    } catch (j) {
                      b(j);
                    }
                }),
                (_.prototype.error = function (O) {
                  var S = this.partialObserver;
                  if (S.error)
                    try {
                      S.error(O);
                    } catch (j) {
                      b(j);
                    }
                  else b(O);
                }),
                (_.prototype.complete = function () {
                  var O = this.partialObserver;
                  if (O.complete)
                    try {
                      O.complete();
                    } catch (S) {
                      b(S);
                    }
                }),
                _
              );
            })(),
            m = (function (_) {
              t(O, _);
              function O(S, j, A) {
                var P = _.call(this) || this,
                  U;
                if (r.isFunction(S) || !S)
                  U = {
                    next: S ?? void 0,
                    error: j ?? void 0,
                    complete: A ?? void 0,
                  };
                else {
                  var Q;
                  P && i.config.useDeprecatedNextContext
                    ? ((Q = Object.create(S)),
                      (Q.unsubscribe = function () {
                        return P.unsubscribe();
                      }),
                      (U = {
                        next: S.next && d(S.next, Q),
                        error: S.error && d(S.error, Q),
                        complete: S.complete && d(S.complete, Q),
                      }))
                    : (U = S);
                }
                return (P.destination = new p(U)), P;
              }
              return O;
            })(f);
          e.SafeSubscriber = m;
          function b(_) {
            i.config.useDeprecatedSynchronousErrorHandling
              ? c.captureError(_)
              : a.reportUnhandledError(_);
          }
          function h(_) {
            throw _;
          }
          function g(_, O) {
            var S = i.config.onStoppedNotification;
            S &&
              l.timeoutProvider.setTimeout(function () {
                return S(_, O);
              });
          }
          e.EMPTY_OBSERVER = {
            closed: !0,
            next: o.noop,
            error: h,
            complete: o.noop,
          };
        })(ke);
      var he = {};
      Object.defineProperty(he, '__esModule', { value: !0 }),
        (he.observable = void 0),
        (he.observable = (function () {
          return (
            (typeof Symbol == 'function' && Symbol.observable) || '@@observable'
          );
        })());
      var ae = {},
        L = {};
      Object.defineProperty(L, '__esModule', { value: !0 }),
        (L.identity = void 0);
      function Su(e) {
        return e;
      }
      (L.identity = Su),
        Object.defineProperty(ae, '__esModule', { value: !0 }),
        (ae.pipeFromArray = ae.pipe = void 0);
      var $u = L;
      function wu() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        return Qi(e);
      }
      ae.pipe = wu;
      function Qi(e) {
        return e.length === 0
          ? $u.identity
          : e.length === 1
          ? e[0]
          : function (r) {
              return e.reduce(function (n, i) {
                return i(n);
              }, r);
            };
      }
      (ae.pipeFromArray = Qi),
        Object.defineProperty(F, '__esModule', { value: !0 }),
        (F.Observable = void 0);
      var di = ke,
        ju = R,
        Pu = he,
        Au = ae,
        Eu = le,
        bi = E,
        Mu = fe,
        Fu = (function () {
          function e(t) {
            t && (this._subscribe = t);
          }
          return (
            (e.prototype.lift = function (t) {
              var r = new e();
              return (r.source = this), (r.operator = t), r;
            }),
            (e.prototype.subscribe = function (t, r, n) {
              var i = this,
                a = Iu(t) ? t : new di.SafeSubscriber(t, r, n);
              return (
                Mu.errorContext(function () {
                  var o = i,
                    u = o.operator,
                    l = o.source;
                  a.add(
                    u ? u.call(a, l) : l ? i._subscribe(a) : i._trySubscribe(a)
                  );
                }),
                a
              );
            }),
            (e.prototype._trySubscribe = function (t) {
              try {
                return this._subscribe(t);
              } catch (r) {
                t.error(r);
              }
            }),
            (e.prototype.forEach = function (t, r) {
              var n = this;
              return (
                (r = Ji(r)),
                new r(function (i, a) {
                  var o = new di.SafeSubscriber({
                    next: function (u) {
                      try {
                        t(u);
                      } catch (l) {
                        a(l), o.unsubscribe();
                      }
                    },
                    error: a,
                    complete: i,
                  });
                  n.subscribe(o);
                })
              );
            }),
            (e.prototype._subscribe = function (t) {
              var r;
              return (r = this.source) === null || r === void 0
                ? void 0
                : r.subscribe(t);
            }),
            (e.prototype[Pu.observable] = function () {
              return this;
            }),
            (e.prototype.pipe = function () {
              for (var t = [], r = 0; r < arguments.length; r++)
                t[r] = arguments[r];
              return Au.pipeFromArray(t)(this);
            }),
            (e.prototype.toPromise = function (t) {
              var r = this;
              return (
                (t = Ji(t)),
                new t(function (n, i) {
                  var a;
                  r.subscribe(
                    function (o) {
                      return (a = o);
                    },
                    function (o) {
                      return i(o);
                    },
                    function () {
                      return n(a);
                    }
                  );
                })
              );
            }),
            (e.create = function (t) {
              return new e(t);
            }),
            e
          );
        })();
      F.Observable = Fu;
      function Ji(e) {
        var t;
        return (t = e ?? Eu.config.Promise) !== null && t !== void 0
          ? t
          : Promise;
      }
      function Tu(e) {
        return (
          e &&
          bi.isFunction(e.next) &&
          bi.isFunction(e.error) &&
          bi.isFunction(e.complete)
        );
      }
      function Iu(e) {
        return (
          (e && e instanceof di.Subscriber) || (Tu(e) && ju.isSubscription(e))
        );
      }
      var ye = {},
        ar = {},
        y = {};
      Object.defineProperty(y, '__esModule', { value: !0 }),
        (y.operate = y.hasLift = void 0);
      var Cu = E;
      function Xi(e) {
        return Cu.isFunction(e?.lift);
      }
      y.hasLift = Xi;
      function ku(e) {
        return function (t) {
          if (Xi(t))
            return t.lift(function (r) {
              try {
                return e(r, this);
              } catch (n) {
                this.error(n);
              }
            });
          throw new TypeError('Unable to lift unknown Observable type');
        };
      }
      y.operate = ku;
      var $ = {},
        Ru =
          (v && v.__extends) ||
          (function () {
            var e = function (t, r) {
              return (
                (e =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (n, i) {
                      n.__proto__ = i;
                    }) ||
                  function (n, i) {
                    for (var a in i)
                      Object.prototype.hasOwnProperty.call(i, a) &&
                        (n[a] = i[a]);
                  }),
                e(t, r)
              );
            };
            return function (t, r) {
              if (typeof r != 'function' && r !== null)
                throw new TypeError(
                  'Class extends value ' +
                    String(r) +
                    ' is not a constructor or null'
                );
              e(t, r);
              function n() {
                this.constructor = t;
              }
              t.prototype =
                r === null
                  ? Object.create(r)
                  : ((n.prototype = r.prototype), new n());
            };
          })();
      Object.defineProperty($, '__esModule', { value: !0 }),
        ($.OperatorSubscriber = $.createOperatorSubscriber = void 0);
      var Wu = ke;
      function Lu(e, t, r, n, i) {
        return new Zi(e, t, r, n, i);
      }
      $.createOperatorSubscriber = Lu;
      var Zi = (function (e) {
        Ru(t, e);
        function t(r, n, i, a, o, u) {
          var l = e.call(this, r) || this;
          return (
            (l.onFinalize = o),
            (l.shouldUnsubscribe = u),
            (l._next = n
              ? function (c) {
                  try {
                    n(c);
                  } catch (f) {
                    r.error(f);
                  }
                }
              : e.prototype._next),
            (l._error = a
              ? function (c) {
                  try {
                    a(c);
                  } catch (f) {
                    r.error(f);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : e.prototype._error),
            (l._complete = i
              ? function () {
                  try {
                    i();
                  } catch (c) {
                    r.error(c);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : e.prototype._complete),
            l
          );
        }
        return (
          (t.prototype.unsubscribe = function () {
            var r;
            if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
              var n = this.closed;
              e.prototype.unsubscribe.call(this),
                !n &&
                  ((r = this.onFinalize) === null ||
                    r === void 0 ||
                    r.call(this));
            }
          }),
          t
        );
      })(Wu.Subscriber);
      ($.OperatorSubscriber = Zi),
        Object.defineProperty(ar, '__esModule', { value: !0 }),
        (ar.refCount = void 0);
      var Nu = y,
        Uu = $;
      function Vu() {
        return Nu.operate(function (e, t) {
          var r = null;
          e._refCount++;
          var n = Uu.createOperatorSubscriber(
            t,
            void 0,
            void 0,
            void 0,
            function () {
              if (!e || e._refCount <= 0 || 0 < --e._refCount) {
                r = null;
                return;
              }
              var i = e._connection,
                a = r;
              (r = null),
                i && (!a || i === a) && i.unsubscribe(),
                t.unsubscribe();
            }
          );
          e.subscribe(n), n.closed || (r = e.connect());
        });
      }
      ar.refCount = Vu;
      var qu =
        (v && v.__extends) ||
        (function () {
          var e = function (t, r) {
            return (
              (e =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (n, i) {
                    n.__proto__ = i;
                  }) ||
                function (n, i) {
                  for (var a in i)
                    Object.prototype.hasOwnProperty.call(i, a) && (n[a] = i[a]);
                }),
              e(t, r)
            );
          };
          return function (t, r) {
            if (typeof r != 'function' && r !== null)
              throw new TypeError(
                'Class extends value ' +
                  String(r) +
                  ' is not a constructor or null'
              );
            e(t, r);
            function n() {
              this.constructor = t;
            }
            t.prototype =
              r === null
                ? Object.create(r)
                : ((n.prototype = r.prototype), new n());
          };
        })();
      Object.defineProperty(ye, '__esModule', { value: !0 }),
        (ye.ConnectableObservable = void 0);
      var zu = F,
        Hi = R,
        xu = ar,
        Bu = $,
        Du = y,
        Yu = (function (e) {
          qu(t, e);
          function t(r, n) {
            var i = e.call(this) || this;
            return (
              (i.source = r),
              (i.subjectFactory = n),
              (i._subject = null),
              (i._refCount = 0),
              (i._connection = null),
              Du.hasLift(r) && (i.lift = r.lift),
              i
            );
          }
          return (
            (t.prototype._subscribe = function (r) {
              return this.getSubject().subscribe(r);
            }),
            (t.prototype.getSubject = function () {
              var r = this._subject;
              return (
                (!r || r.isStopped) && (this._subject = this.subjectFactory()),
                this._subject
              );
            }),
            (t.prototype._teardown = function () {
              this._refCount = 0;
              var r = this._connection;
              (this._subject = this._connection = null), r?.unsubscribe();
            }),
            (t.prototype.connect = function () {
              var r = this,
                n = this._connection;
              if (!n) {
                n = this._connection = new Hi.Subscription();
                var i = this.getSubject();
                n.add(
                  this.source.subscribe(
                    Bu.createOperatorSubscriber(
                      i,
                      void 0,
                      function () {
                        r._teardown(), i.complete();
                      },
                      function (a) {
                        r._teardown(), i.error(a);
                      },
                      function () {
                        return r._teardown();
                      }
                    )
                  )
                ),
                  n.closed &&
                    ((this._connection = null), (n = Hi.Subscription.EMPTY));
              }
              return n;
            }),
            (t.prototype.refCount = function () {
              return xu.refCount()(this);
            }),
            t
          );
        })(zu.Observable);
      ye.ConnectableObservable = Yu;
      var Jr = {},
        ea = {};
      (function (e) {
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.performanceTimestampProvider = void 0),
          (e.performanceTimestampProvider = {
            now: function () {
              return (
                e.performanceTimestampProvider.delegate || performance
              ).now();
            },
            delegate: void 0,
          });
      })(ea);
      var pi = {};
      (function (e) {
        var t =
            (v && v.__read) ||
            function (i, a) {
              var o = typeof Symbol == 'function' && i[Symbol.iterator];
              if (!o) return i;
              var u = o.call(i),
                l,
                c = [],
                f;
              try {
                for (; (a === void 0 || a-- > 0) && !(l = u.next()).done; )
                  c.push(l.value);
              } catch (s) {
                f = { error: s };
              } finally {
                try {
                  l && !l.done && (o = u.return) && o.call(u);
                } finally {
                  if (f) throw f.error;
                }
              }
              return c;
            },
          r =
            (v && v.__spreadArray) ||
            function (i, a) {
              for (var o = 0, u = a.length, l = i.length; o < u; o++, l++)
                i[l] = a[o];
              return i;
            };
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.animationFrameProvider = void 0);
        var n = R;
        e.animationFrameProvider = {
          schedule: function (i) {
            var a = requestAnimationFrame,
              o = cancelAnimationFrame,
              u = e.animationFrameProvider.delegate;
            u && ((a = u.requestAnimationFrame), (o = u.cancelAnimationFrame));
            var l = a(function (c) {
              (o = void 0), i(c);
            });
            return new n.Subscription(function () {
              return o?.(l);
            });
          },
          requestAnimationFrame: function () {
            for (var i = [], a = 0; a < arguments.length; a++)
              i[a] = arguments[a];
            var o = e.animationFrameProvider.delegate;
            return (o?.requestAnimationFrame || requestAnimationFrame).apply(
              void 0,
              r([], t(i))
            );
          },
          cancelAnimationFrame: function () {
            for (var i = [], a = 0; a < arguments.length; a++)
              i[a] = arguments[a];
            var o = e.animationFrameProvider.delegate;
            return (o?.cancelAnimationFrame || cancelAnimationFrame).apply(
              void 0,
              r([], t(i))
            );
          },
          delegate: void 0,
        };
      })(pi),
        Object.defineProperty(Jr, '__esModule', { value: !0 }),
        (Jr.animationFrames = void 0);
      var Gu = F,
        Ku = ea,
        ra = pi;
      function Qu(e) {
        return e ? ta(e) : Ju;
      }
      Jr.animationFrames = Qu;
      function ta(e) {
        return new Gu.Observable(function (t) {
          var r = e || Ku.performanceTimestampProvider,
            n = r.now(),
            i = 0,
            a = function () {
              t.closed ||
                (i = ra.animationFrameProvider.requestAnimationFrame(function (
                  o
                ) {
                  i = 0;
                  var u = r.now();
                  t.next({ timestamp: e ? u : o, elapsed: u - n }), a();
                }));
            };
          return (
            a(),
            function () {
              i && ra.animationFrameProvider.cancelAnimationFrame(i);
            }
          );
        });
      }
      var Ju = ta(),
        I = {},
        or = {};
      Object.defineProperty(or, '__esModule', { value: !0 }),
        (or.ObjectUnsubscribedError = void 0);
      var Xu = J;
      or.ObjectUnsubscribedError = Xu.createErrorClass(function (e) {
        return function () {
          e(this),
            (this.name = 'ObjectUnsubscribedError'),
            (this.message = 'object unsubscribed');
        };
      });
      var na =
          (v && v.__extends) ||
          (function () {
            var e = function (t, r) {
              return (
                (e =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (n, i) {
                      n.__proto__ = i;
                    }) ||
                  function (n, i) {
                    for (var a in i)
                      Object.prototype.hasOwnProperty.call(i, a) &&
                        (n[a] = i[a]);
                  }),
                e(t, r)
              );
            };
            return function (t, r) {
              if (typeof r != 'function' && r !== null)
                throw new TypeError(
                  'Class extends value ' +
                    String(r) +
                    ' is not a constructor or null'
                );
              e(t, r);
              function n() {
                this.constructor = t;
              }
              t.prototype =
                r === null
                  ? Object.create(r)
                  : ((n.prototype = r.prototype), new n());
            };
          })(),
        Zu =
          (v && v.__values) ||
          function (e) {
            var t = typeof Symbol == 'function' && Symbol.iterator,
              r = t && e[t],
              n = 0;
            if (r) return r.call(e);
            if (e && typeof e.length == 'number')
              return {
                next: function () {
                  return (
                    e && n >= e.length && (e = void 0),
                    { value: e && e[n++], done: !e }
                  );
                },
              };
            throw new TypeError(
              t ? 'Object is not iterable.' : 'Symbol.iterator is not defined.'
            );
          };
      Object.defineProperty(I, '__esModule', { value: !0 }),
        (I.AnonymousSubject = I.Subject = void 0);
      var ia = F,
        mi = R,
        Hu = or,
        ec = B,
        hi = fe,
        aa = (function (e) {
          na(t, e);
          function t() {
            var r = e.call(this) || this;
            return (
              (r.closed = !1),
              (r.currentObservers = null),
              (r.observers = []),
              (r.isStopped = !1),
              (r.hasError = !1),
              (r.thrownError = null),
              r
            );
          }
          return (
            (t.prototype.lift = function (r) {
              var n = new yi(this, this);
              return (n.operator = r), n;
            }),
            (t.prototype._throwIfClosed = function () {
              if (this.closed) throw new Hu.ObjectUnsubscribedError();
            }),
            (t.prototype.next = function (r) {
              var n = this;
              hi.errorContext(function () {
                var i, a;
                if ((n._throwIfClosed(), !n.isStopped)) {
                  n.currentObservers ||
                    (n.currentObservers = Array.from(n.observers));
                  try {
                    for (
                      var o = Zu(n.currentObservers), u = o.next();
                      !u.done;
                      u = o.next()
                    ) {
                      var l = u.value;
                      l.next(r);
                    }
                  } catch (c) {
                    i = { error: c };
                  } finally {
                    try {
                      u && !u.done && (a = o.return) && a.call(o);
                    } finally {
                      if (i) throw i.error;
                    }
                  }
                }
              });
            }),
            (t.prototype.error = function (r) {
              var n = this;
              hi.errorContext(function () {
                if ((n._throwIfClosed(), !n.isStopped)) {
                  (n.hasError = n.isStopped = !0), (n.thrownError = r);
                  for (var i = n.observers; i.length; ) i.shift().error(r);
                }
              });
            }),
            (t.prototype.complete = function () {
              var r = this;
              hi.errorContext(function () {
                if ((r._throwIfClosed(), !r.isStopped)) {
                  r.isStopped = !0;
                  for (var n = r.observers; n.length; ) n.shift().complete();
                }
              });
            }),
            (t.prototype.unsubscribe = function () {
              (this.isStopped = this.closed = !0),
                (this.observers = this.currentObservers = null);
            }),
            Object.defineProperty(t.prototype, 'observed', {
              get: function () {
                var r;
                return (
                  ((r = this.observers) === null || r === void 0
                    ? void 0
                    : r.length) > 0
                );
              },
              enumerable: !1,
              configurable: !0,
            }),
            (t.prototype._trySubscribe = function (r) {
              return (
                this._throwIfClosed(), e.prototype._trySubscribe.call(this, r)
              );
            }),
            (t.prototype._subscribe = function (r) {
              return (
                this._throwIfClosed(),
                this._checkFinalizedStatuses(r),
                this._innerSubscribe(r)
              );
            }),
            (t.prototype._innerSubscribe = function (r) {
              var n = this,
                i = this,
                a = i.hasError,
                o = i.isStopped,
                u = i.observers;
              return a || o
                ? mi.EMPTY_SUBSCRIPTION
                : ((this.currentObservers = null),
                  u.push(r),
                  new mi.Subscription(function () {
                    (n.currentObservers = null), ec.arrRemove(u, r);
                  }));
            }),
            (t.prototype._checkFinalizedStatuses = function (r) {
              var n = this,
                i = n.hasError,
                a = n.thrownError,
                o = n.isStopped;
              i ? r.error(a) : o && r.complete();
            }),
            (t.prototype.asObservable = function () {
              var r = new ia.Observable();
              return (r.source = this), r;
            }),
            (t.create = function (r, n) {
              return new yi(r, n);
            }),
            t
          );
        })(ia.Observable);
      I.Subject = aa;
      var yi = (function (e) {
        na(t, e);
        function t(r, n) {
          var i = e.call(this) || this;
          return (i.destination = r), (i.source = n), i;
        }
        return (
          (t.prototype.next = function (r) {
            var n, i;
            (i =
              (n = this.destination) === null || n === void 0
                ? void 0
                : n.next) === null ||
              i === void 0 ||
              i.call(n, r);
          }),
          (t.prototype.error = function (r) {
            var n, i;
            (i =
              (n = this.destination) === null || n === void 0
                ? void 0
                : n.error) === null ||
              i === void 0 ||
              i.call(n, r);
          }),
          (t.prototype.complete = function () {
            var r, n;
            (n =
              (r = this.destination) === null || r === void 0
                ? void 0
                : r.complete) === null ||
              n === void 0 ||
              n.call(r);
          }),
          (t.prototype._subscribe = function (r) {
            var n, i;
            return (i =
              (n = this.source) === null || n === void 0
                ? void 0
                : n.subscribe(r)) !== null && i !== void 0
              ? i
              : mi.EMPTY_SUBSCRIPTION;
          }),
          t
        );
      })(aa);
      I.AnonymousSubject = yi;
      var ur = {},
        rc =
          (v && v.__extends) ||
          (function () {
            var e = function (t, r) {
              return (
                (e =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (n, i) {
                      n.__proto__ = i;
                    }) ||
                  function (n, i) {
                    for (var a in i)
                      Object.prototype.hasOwnProperty.call(i, a) &&
                        (n[a] = i[a]);
                  }),
                e(t, r)
              );
            };
            return function (t, r) {
              if (typeof r != 'function' && r !== null)
                throw new TypeError(
                  'Class extends value ' +
                    String(r) +
                    ' is not a constructor or null'
                );
              e(t, r);
              function n() {
                this.constructor = t;
              }
              t.prototype =
                r === null
                  ? Object.create(r)
                  : ((n.prototype = r.prototype), new n());
            };
          })();
      Object.defineProperty(ur, '__esModule', { value: !0 }),
        (ur.BehaviorSubject = void 0);
      var tc = I,
        nc = (function (e) {
          rc(t, e);
          function t(r) {
            var n = e.call(this) || this;
            return (n._value = r), n;
          }
          return (
            Object.defineProperty(t.prototype, 'value', {
              get: function () {
                return this.getValue();
              },
              enumerable: !1,
              configurable: !0,
            }),
            (t.prototype._subscribe = function (r) {
              var n = e.prototype._subscribe.call(this, r);
              return !n.closed && r.next(this._value), n;
            }),
            (t.prototype.getValue = function () {
              var r = this,
                n = r.hasError,
                i = r.thrownError,
                a = r._value;
              if (n) throw i;
              return this._throwIfClosed(), a;
            }),
            (t.prototype.next = function (r) {
              e.prototype.next.call(this, (this._value = r));
            }),
            t
          );
        })(tc.Subject);
      ur.BehaviorSubject = nc;
      var Re = {},
        Xr = {};
      (function (e) {
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.dateTimestampProvider = void 0),
          (e.dateTimestampProvider = {
            now: function () {
              return (e.dateTimestampProvider.delegate || Date).now();
            },
            delegate: void 0,
          });
      })(Xr);
      var ic =
        (v && v.__extends) ||
        (function () {
          var e = function (t, r) {
            return (
              (e =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (n, i) {
                    n.__proto__ = i;
                  }) ||
                function (n, i) {
                  for (var a in i)
                    Object.prototype.hasOwnProperty.call(i, a) && (n[a] = i[a]);
                }),
              e(t, r)
            );
          };
          return function (t, r) {
            if (typeof r != 'function' && r !== null)
              throw new TypeError(
                'Class extends value ' +
                  String(r) +
                  ' is not a constructor or null'
              );
            e(t, r);
            function n() {
              this.constructor = t;
            }
            t.prototype =
              r === null
                ? Object.create(r)
                : ((n.prototype = r.prototype), new n());
          };
        })();
      Object.defineProperty(Re, '__esModule', { value: !0 }),
        (Re.ReplaySubject = void 0);
      var ac = I,
        oc = Xr,
        uc = (function (e) {
          ic(t, e);
          function t(r, n, i) {
            r === void 0 && (r = 1 / 0),
              n === void 0 && (n = 1 / 0),
              i === void 0 && (i = oc.dateTimestampProvider);
            var a = e.call(this) || this;
            return (
              (a._bufferSize = r),
              (a._windowTime = n),
              (a._timestampProvider = i),
              (a._buffer = []),
              (a._infiniteTimeWindow = !0),
              (a._infiniteTimeWindow = n === 1 / 0),
              (a._bufferSize = Math.max(1, r)),
              (a._windowTime = Math.max(1, n)),
              a
            );
          }
          return (
            (t.prototype.next = function (r) {
              var n = this,
                i = n.isStopped,
                a = n._buffer,
                o = n._infiniteTimeWindow,
                u = n._timestampProvider,
                l = n._windowTime;
              i || (a.push(r), !o && a.push(u.now() + l)),
                this._trimBuffer(),
                e.prototype.next.call(this, r);
            }),
            (t.prototype._subscribe = function (r) {
              this._throwIfClosed(), this._trimBuffer();
              for (
                var n = this._innerSubscribe(r),
                  i = this,
                  a = i._infiniteTimeWindow,
                  o = i._buffer,
                  u = o.slice(),
                  l = 0;
                l < u.length && !r.closed;
                l += a ? 1 : 2
              )
                r.next(u[l]);
              return this._checkFinalizedStatuses(r), n;
            }),
            (t.prototype._trimBuffer = function () {
              var r = this,
                n = r._bufferSize,
                i = r._timestampProvider,
                a = r._buffer,
                o = r._infiniteTimeWindow,
                u = (o ? 1 : 2) * n;
              if (
                (n < 1 / 0 && u < a.length && a.splice(0, a.length - u), !o)
              ) {
                for (
                  var l = i.now(), c = 0, f = 1;
                  f < a.length && a[f] <= l;
                  f += 2
                )
                  c = f;
                c && a.splice(0, c + 1);
              }
            }),
            t
          );
        })(ac.Subject);
      Re.ReplaySubject = uc;
      var We = {},
        cc =
          (v && v.__extends) ||
          (function () {
            var e = function (t, r) {
              return (
                (e =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (n, i) {
                      n.__proto__ = i;
                    }) ||
                  function (n, i) {
                    for (var a in i)
                      Object.prototype.hasOwnProperty.call(i, a) &&
                        (n[a] = i[a]);
                  }),
                e(t, r)
              );
            };
            return function (t, r) {
              if (typeof r != 'function' && r !== null)
                throw new TypeError(
                  'Class extends value ' +
                    String(r) +
                    ' is not a constructor or null'
                );
              e(t, r);
              function n() {
                this.constructor = t;
              }
              t.prototype =
                r === null
                  ? Object.create(r)
                  : ((n.prototype = r.prototype), new n());
            };
          })();
      Object.defineProperty(We, '__esModule', { value: !0 }),
        (We.AsyncSubject = void 0);
      var lc = I,
        fc = (function (e) {
          cc(t, e);
          function t() {
            var r = (e !== null && e.apply(this, arguments)) || this;
            return (
              (r._value = null), (r._hasValue = !1), (r._isComplete = !1), r
            );
          }
          return (
            (t.prototype._checkFinalizedStatuses = function (r) {
              var n = this,
                i = n.hasError,
                a = n._hasValue,
                o = n._value,
                u = n.thrownError,
                l = n.isStopped,
                c = n._isComplete;
              i ? r.error(u) : (l || c) && (a && r.next(o), r.complete());
            }),
            (t.prototype.next = function (r) {
              this.isStopped || ((this._value = r), (this._hasValue = !0));
            }),
            (t.prototype.complete = function () {
              var r = this,
                n = r._hasValue,
                i = r._value,
                a = r._isComplete;
              a ||
                ((this._isComplete = !0),
                n && e.prototype.next.call(this, i),
                e.prototype.complete.call(this));
            }),
            t
          );
        })(lc.Subject);
      We.AsyncSubject = fc;
      var oa = {},
        Zr = {},
        se = {},
        Hr = {},
        sc =
          (v && v.__extends) ||
          (function () {
            var e = function (t, r) {
              return (
                (e =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (n, i) {
                      n.__proto__ = i;
                    }) ||
                  function (n, i) {
                    for (var a in i)
                      Object.prototype.hasOwnProperty.call(i, a) &&
                        (n[a] = i[a]);
                  }),
                e(t, r)
              );
            };
            return function (t, r) {
              if (typeof r != 'function' && r !== null)
                throw new TypeError(
                  'Class extends value ' +
                    String(r) +
                    ' is not a constructor or null'
                );
              e(t, r);
              function n() {
                this.constructor = t;
              }
              t.prototype =
                r === null
                  ? Object.create(r)
                  : ((n.prototype = r.prototype), new n());
            };
          })();
      Object.defineProperty(Hr, '__esModule', { value: !0 }),
        (Hr.Action = void 0);
      var vc = R,
        dc = (function (e) {
          sc(t, e);
          function t(r, n) {
            return e.call(this) || this;
          }
          return (
            (t.prototype.schedule = function (r, n) {
              return this;
            }),
            t
          );
        })(vc.Subscription);
      Hr.Action = dc;
      var ua = {};
      (function (e) {
        var t =
            (v && v.__read) ||
            function (n, i) {
              var a = typeof Symbol == 'function' && n[Symbol.iterator];
              if (!a) return n;
              var o = a.call(n),
                u,
                l = [],
                c;
              try {
                for (; (i === void 0 || i-- > 0) && !(u = o.next()).done; )
                  l.push(u.value);
              } catch (f) {
                c = { error: f };
              } finally {
                try {
                  u && !u.done && (a = o.return) && a.call(o);
                } finally {
                  if (c) throw c.error;
                }
              }
              return l;
            },
          r =
            (v && v.__spreadArray) ||
            function (n, i) {
              for (var a = 0, o = i.length, u = n.length; a < o; a++, u++)
                n[u] = i[a];
              return n;
            };
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.intervalProvider = void 0),
          (e.intervalProvider = {
            setInterval: function (n, i) {
              for (var a = [], o = 2; o < arguments.length; o++)
                a[o - 2] = arguments[o];
              var u = e.intervalProvider.delegate;
              return u?.setInterval
                ? u.setInterval.apply(u, r([n, i], t(a)))
                : setInterval.apply(void 0, r([n, i], t(a)));
            },
            clearInterval: function (n) {
              var i = e.intervalProvider.delegate;
              return (i?.clearInterval || clearInterval)(n);
            },
            delegate: void 0,
          });
      })(ua);
      var bc =
        (v && v.__extends) ||
        (function () {
          var e = function (t, r) {
            return (
              (e =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (n, i) {
                    n.__proto__ = i;
                  }) ||
                function (n, i) {
                  for (var a in i)
                    Object.prototype.hasOwnProperty.call(i, a) && (n[a] = i[a]);
                }),
              e(t, r)
            );
          };
          return function (t, r) {
            if (typeof r != 'function' && r !== null)
              throw new TypeError(
                'Class extends value ' +
                  String(r) +
                  ' is not a constructor or null'
              );
            e(t, r);
            function n() {
              this.constructor = t;
            }
            t.prototype =
              r === null
                ? Object.create(r)
                : ((n.prototype = r.prototype), new n());
          };
        })();
      Object.defineProperty(se, '__esModule', { value: !0 }),
        (se.AsyncAction = void 0);
      var pc = Hr,
        ca = ua,
        mc = B,
        hc = (function (e) {
          bc(t, e);
          function t(r, n) {
            var i = e.call(this, r, n) || this;
            return (i.scheduler = r), (i.work = n), (i.pending = !1), i;
          }
          return (
            (t.prototype.schedule = function (r, n) {
              var i;
              if ((n === void 0 && (n = 0), this.closed)) return this;
              this.state = r;
              var a = this.id,
                o = this.scheduler;
              return (
                a != null && (this.id = this.recycleAsyncId(o, a, n)),
                (this.pending = !0),
                (this.delay = n),
                (this.id =
                  (i = this.id) !== null && i !== void 0
                    ? i
                    : this.requestAsyncId(o, this.id, n)),
                this
              );
            }),
            (t.prototype.requestAsyncId = function (r, n, i) {
              return (
                i === void 0 && (i = 0),
                ca.intervalProvider.setInterval(r.flush.bind(r, this), i)
              );
            }),
            (t.prototype.recycleAsyncId = function (r, n, i) {
              if (
                (i === void 0 && (i = 0),
                i != null && this.delay === i && this.pending === !1)
              )
                return n;
              n != null && ca.intervalProvider.clearInterval(n);
            }),
            (t.prototype.execute = function (r, n) {
              if (this.closed) return new Error('executing a cancelled action');
              this.pending = !1;
              var i = this._execute(r, n);
              if (i) return i;
              this.pending === !1 &&
                this.id != null &&
                (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
            }),
            (t.prototype._execute = function (r, n) {
              var i = !1,
                a;
              try {
                this.work(r);
              } catch (o) {
                (i = !0),
                  (a = o || new Error('Scheduled action threw falsy error'));
              }
              if (i) return this.unsubscribe(), a;
            }),
            (t.prototype.unsubscribe = function () {
              if (!this.closed) {
                var r = this,
                  n = r.id,
                  i = r.scheduler,
                  a = i.actions;
                (this.work = this.state = this.scheduler = null),
                  (this.pending = !1),
                  mc.arrRemove(a, this),
                  n != null && (this.id = this.recycleAsyncId(i, n, null)),
                  (this.delay = null),
                  e.prototype.unsubscribe.call(this);
              }
            }),
            t
          );
        })(pc.Action);
      se.AsyncAction = hc;
      var la = {},
        Le = {};
      Object.defineProperty(Le, '__esModule', { value: !0 }),
        (Le.TestTools = Le.Immediate = void 0);
      var yc = 1,
        _i,
        et = {};
      function fa(e) {
        return e in et ? (delete et[e], !0) : !1;
      }
      (Le.Immediate = {
        setImmediate: function (e) {
          var t = yc++;
          return (
            (et[t] = !0),
            _i || (_i = Promise.resolve()),
            _i.then(function () {
              return fa(t) && e();
            }),
            t
          );
        },
        clearImmediate: function (e) {
          fa(e);
        },
      }),
        (Le.TestTools = {
          pending: function () {
            return Object.keys(et).length;
          },
        }),
        (function (e) {
          var t =
              (v && v.__read) ||
              function (o, u) {
                var l = typeof Symbol == 'function' && o[Symbol.iterator];
                if (!l) return o;
                var c = l.call(o),
                  f,
                  s = [],
                  d;
                try {
                  for (; (u === void 0 || u-- > 0) && !(f = c.next()).done; )
                    s.push(f.value);
                } catch (p) {
                  d = { error: p };
                } finally {
                  try {
                    f && !f.done && (l = c.return) && l.call(c);
                  } finally {
                    if (d) throw d.error;
                  }
                }
                return s;
              },
            r =
              (v && v.__spreadArray) ||
              function (o, u) {
                for (var l = 0, c = u.length, f = o.length; l < c; l++, f++)
                  o[f] = u[l];
                return o;
              };
          Object.defineProperty(e, '__esModule', { value: !0 }),
            (e.immediateProvider = void 0);
          var n = Le,
            i = n.Immediate.setImmediate,
            a = n.Immediate.clearImmediate;
          e.immediateProvider = {
            setImmediate: function () {
              for (var o = [], u = 0; u < arguments.length; u++)
                o[u] = arguments[u];
              var l = e.immediateProvider.delegate;
              return (l?.setImmediate || i).apply(void 0, r([], t(o)));
            },
            clearImmediate: function (o) {
              var u = e.immediateProvider.delegate;
              return (u?.clearImmediate || a)(o);
            },
            delegate: void 0,
          };
        })(la);
      var _c =
        (v && v.__extends) ||
        (function () {
          var e = function (t, r) {
            return (
              (e =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (n, i) {
                    n.__proto__ = i;
                  }) ||
                function (n, i) {
                  for (var a in i)
                    Object.prototype.hasOwnProperty.call(i, a) && (n[a] = i[a]);
                }),
              e(t, r)
            );
          };
          return function (t, r) {
            if (typeof r != 'function' && r !== null)
              throw new TypeError(
                'Class extends value ' +
                  String(r) +
                  ' is not a constructor or null'
              );
            e(t, r);
            function n() {
              this.constructor = t;
            }
            t.prototype =
              r === null
                ? Object.create(r)
                : ((n.prototype = r.prototype), new n());
          };
        })();
      Object.defineProperty(Zr, '__esModule', { value: !0 }),
        (Zr.AsapAction = void 0);
      var gc = se,
        sa = la,
        Oc = (function (e) {
          _c(t, e);
          function t(r, n) {
            var i = e.call(this, r, n) || this;
            return (i.scheduler = r), (i.work = n), i;
          }
          return (
            (t.prototype.requestAsyncId = function (r, n, i) {
              return (
                i === void 0 && (i = 0),
                i !== null && i > 0
                  ? e.prototype.requestAsyncId.call(this, r, n, i)
                  : (r.actions.push(this),
                    r._scheduled ||
                      (r._scheduled = sa.immediateProvider.setImmediate(
                        r.flush.bind(r, void 0)
                      )))
              );
            }),
            (t.prototype.recycleAsyncId = function (r, n, i) {
              var a;
              if ((i === void 0 && (i = 0), i != null ? i > 0 : this.delay > 0))
                return e.prototype.recycleAsyncId.call(this, r, n, i);
              var o = r.actions;
              n != null &&
                ((a = o[o.length - 1]) === null || a === void 0
                  ? void 0
                  : a.id) !== n &&
                (sa.immediateProvider.clearImmediate(n),
                (r._scheduled = void 0));
            }),
            t
          );
        })(gc.AsyncAction);
      Zr.AsapAction = Oc;
      var rt = {},
        ve = {},
        cr = {};
      Object.defineProperty(cr, '__esModule', { value: !0 }),
        (cr.Scheduler = void 0);
      var Sc = Xr,
        $c = (function () {
          function e(t, r) {
            r === void 0 && (r = e.now),
              (this.schedulerActionCtor = t),
              (this.now = r);
          }
          return (
            (e.prototype.schedule = function (t, r, n) {
              return (
                r === void 0 && (r = 0),
                new this.schedulerActionCtor(this, t).schedule(n, r)
              );
            }),
            (e.now = Sc.dateTimestampProvider.now),
            e
          );
        })();
      cr.Scheduler = $c;
      var wc =
        (v && v.__extends) ||
        (function () {
          var e = function (t, r) {
            return (
              (e =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (n, i) {
                    n.__proto__ = i;
                  }) ||
                function (n, i) {
                  for (var a in i)
                    Object.prototype.hasOwnProperty.call(i, a) && (n[a] = i[a]);
                }),
              e(t, r)
            );
          };
          return function (t, r) {
            if (typeof r != 'function' && r !== null)
              throw new TypeError(
                'Class extends value ' +
                  String(r) +
                  ' is not a constructor or null'
              );
            e(t, r);
            function n() {
              this.constructor = t;
            }
            t.prototype =
              r === null
                ? Object.create(r)
                : ((n.prototype = r.prototype), new n());
          };
        })();
      Object.defineProperty(ve, '__esModule', { value: !0 }),
        (ve.AsyncScheduler = void 0);
      var va = cr,
        jc = (function (e) {
          wc(t, e);
          function t(r, n) {
            n === void 0 && (n = va.Scheduler.now);
            var i = e.call(this, r, n) || this;
            return (i.actions = []), (i._active = !1), i;
          }
          return (
            (t.prototype.flush = function (r) {
              var n = this.actions;
              if (this._active) {
                n.push(r);
                return;
              }
              var i;
              this._active = !0;
              do if ((i = r.execute(r.state, r.delay))) break;
              while ((r = n.shift()));
              if (((this._active = !1), i)) {
                for (; (r = n.shift()); ) r.unsubscribe();
                throw i;
              }
            }),
            t
          );
        })(va.Scheduler);
      ve.AsyncScheduler = jc;
      var Pc =
        (v && v.__extends) ||
        (function () {
          var e = function (t, r) {
            return (
              (e =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (n, i) {
                    n.__proto__ = i;
                  }) ||
                function (n, i) {
                  for (var a in i)
                    Object.prototype.hasOwnProperty.call(i, a) && (n[a] = i[a]);
                }),
              e(t, r)
            );
          };
          return function (t, r) {
            if (typeof r != 'function' && r !== null)
              throw new TypeError(
                'Class extends value ' +
                  String(r) +
                  ' is not a constructor or null'
              );
            e(t, r);
            function n() {
              this.constructor = t;
            }
            t.prototype =
              r === null
                ? Object.create(r)
                : ((n.prototype = r.prototype), new n());
          };
        })();
      Object.defineProperty(rt, '__esModule', { value: !0 }),
        (rt.AsapScheduler = void 0);
      var Ac = ve,
        Ec = (function (e) {
          Pc(t, e);
          function t() {
            return (e !== null && e.apply(this, arguments)) || this;
          }
          return (
            (t.prototype.flush = function (r) {
              this._active = !0;
              var n = this._scheduled;
              this._scheduled = void 0;
              var i = this.actions,
                a;
              r = r || i.shift();
              do if ((a = r.execute(r.state, r.delay))) break;
              while ((r = i[0]) && r.id === n && i.shift());
              if (((this._active = !1), a)) {
                for (; (r = i[0]) && r.id === n && i.shift(); ) r.unsubscribe();
                throw a;
              }
            }),
            t
          );
        })(Ac.AsyncScheduler);
      (rt.AsapScheduler = Ec),
        (function (e) {
          Object.defineProperty(e, '__esModule', { value: !0 }),
            (e.asap = e.asapScheduler = void 0);
          var t = Zr,
            r = rt;
          (e.asapScheduler = new r.AsapScheduler(t.AsapAction)),
            (e.asap = e.asapScheduler);
        })(oa);
      var q = {};
      (function (e) {
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.async = e.asyncScheduler = void 0);
        var t = se,
          r = ve;
        (e.asyncScheduler = new r.AsyncScheduler(t.AsyncAction)),
          (e.async = e.asyncScheduler);
      })(q);
      var da = {},
        tt = {},
        Mc =
          (v && v.__extends) ||
          (function () {
            var e = function (t, r) {
              return (
                (e =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (n, i) {
                      n.__proto__ = i;
                    }) ||
                  function (n, i) {
                    for (var a in i)
                      Object.prototype.hasOwnProperty.call(i, a) &&
                        (n[a] = i[a]);
                  }),
                e(t, r)
              );
            };
            return function (t, r) {
              if (typeof r != 'function' && r !== null)
                throw new TypeError(
                  'Class extends value ' +
                    String(r) +
                    ' is not a constructor or null'
                );
              e(t, r);
              function n() {
                this.constructor = t;
              }
              t.prototype =
                r === null
                  ? Object.create(r)
                  : ((n.prototype = r.prototype), new n());
            };
          })();
      Object.defineProperty(tt, '__esModule', { value: !0 }),
        (tt.QueueAction = void 0);
      var Fc = se,
        Tc = (function (e) {
          Mc(t, e);
          function t(r, n) {
            var i = e.call(this, r, n) || this;
            return (i.scheduler = r), (i.work = n), i;
          }
          return (
            (t.prototype.schedule = function (r, n) {
              return (
                n === void 0 && (n = 0),
                n > 0
                  ? e.prototype.schedule.call(this, r, n)
                  : ((this.delay = n),
                    (this.state = r),
                    this.scheduler.flush(this),
                    this)
              );
            }),
            (t.prototype.execute = function (r, n) {
              return n > 0 || this.closed
                ? e.prototype.execute.call(this, r, n)
                : this._execute(r, n);
            }),
            (t.prototype.requestAsyncId = function (r, n, i) {
              return (
                i === void 0 && (i = 0),
                (i != null && i > 0) || (i == null && this.delay > 0)
                  ? e.prototype.requestAsyncId.call(this, r, n, i)
                  : (r.flush(this), 0)
              );
            }),
            t
          );
        })(Fc.AsyncAction);
      tt.QueueAction = Tc;
      var nt = {},
        Ic =
          (v && v.__extends) ||
          (function () {
            var e = function (t, r) {
              return (
                (e =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (n, i) {
                      n.__proto__ = i;
                    }) ||
                  function (n, i) {
                    for (var a in i)
                      Object.prototype.hasOwnProperty.call(i, a) &&
                        (n[a] = i[a]);
                  }),
                e(t, r)
              );
            };
            return function (t, r) {
              if (typeof r != 'function' && r !== null)
                throw new TypeError(
                  'Class extends value ' +
                    String(r) +
                    ' is not a constructor or null'
                );
              e(t, r);
              function n() {
                this.constructor = t;
              }
              t.prototype =
                r === null
                  ? Object.create(r)
                  : ((n.prototype = r.prototype), new n());
            };
          })();
      Object.defineProperty(nt, '__esModule', { value: !0 }),
        (nt.QueueScheduler = void 0);
      var Cc = ve,
        kc = (function (e) {
          Ic(t, e);
          function t() {
            return (e !== null && e.apply(this, arguments)) || this;
          }
          return t;
        })(Cc.AsyncScheduler);
      (nt.QueueScheduler = kc),
        (function (e) {
          Object.defineProperty(e, '__esModule', { value: !0 }),
            (e.queue = e.queueScheduler = void 0);
          var t = tt,
            r = nt;
          (e.queueScheduler = new r.QueueScheduler(t.QueueAction)),
            (e.queue = e.queueScheduler);
        })(da);
      var ba = {},
        it = {},
        Rc =
          (v && v.__extends) ||
          (function () {
            var e = function (t, r) {
              return (
                (e =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (n, i) {
                      n.__proto__ = i;
                    }) ||
                  function (n, i) {
                    for (var a in i)
                      Object.prototype.hasOwnProperty.call(i, a) &&
                        (n[a] = i[a]);
                  }),
                e(t, r)
              );
            };
            return function (t, r) {
              if (typeof r != 'function' && r !== null)
                throw new TypeError(
                  'Class extends value ' +
                    String(r) +
                    ' is not a constructor or null'
                );
              e(t, r);
              function n() {
                this.constructor = t;
              }
              t.prototype =
                r === null
                  ? Object.create(r)
                  : ((n.prototype = r.prototype), new n());
            };
          })();
      Object.defineProperty(it, '__esModule', { value: !0 }),
        (it.AnimationFrameAction = void 0);
      var Wc = se,
        pa = pi,
        Lc = (function (e) {
          Rc(t, e);
          function t(r, n) {
            var i = e.call(this, r, n) || this;
            return (i.scheduler = r), (i.work = n), i;
          }
          return (
            (t.prototype.requestAsyncId = function (r, n, i) {
              return (
                i === void 0 && (i = 0),
                i !== null && i > 0
                  ? e.prototype.requestAsyncId.call(this, r, n, i)
                  : (r.actions.push(this),
                    r._scheduled ||
                      (r._scheduled =
                        pa.animationFrameProvider.requestAnimationFrame(
                          function () {
                            return r.flush(void 0);
                          }
                        )))
              );
            }),
            (t.prototype.recycleAsyncId = function (r, n, i) {
              var a;
              if ((i === void 0 && (i = 0), i != null ? i > 0 : this.delay > 0))
                return e.prototype.recycleAsyncId.call(this, r, n, i);
              var o = r.actions;
              n != null &&
                ((a = o[o.length - 1]) === null || a === void 0
                  ? void 0
                  : a.id) !== n &&
                (pa.animationFrameProvider.cancelAnimationFrame(n),
                (r._scheduled = void 0));
            }),
            t
          );
        })(Wc.AsyncAction);
      it.AnimationFrameAction = Lc;
      var at = {},
        Nc =
          (v && v.__extends) ||
          (function () {
            var e = function (t, r) {
              return (
                (e =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (n, i) {
                      n.__proto__ = i;
                    }) ||
                  function (n, i) {
                    for (var a in i)
                      Object.prototype.hasOwnProperty.call(i, a) &&
                        (n[a] = i[a]);
                  }),
                e(t, r)
              );
            };
            return function (t, r) {
              if (typeof r != 'function' && r !== null)
                throw new TypeError(
                  'Class extends value ' +
                    String(r) +
                    ' is not a constructor or null'
                );
              e(t, r);
              function n() {
                this.constructor = t;
              }
              t.prototype =
                r === null
                  ? Object.create(r)
                  : ((n.prototype = r.prototype), new n());
            };
          })();
      Object.defineProperty(at, '__esModule', { value: !0 }),
        (at.AnimationFrameScheduler = void 0);
      var Uc = ve,
        Vc = (function (e) {
          Nc(t, e);
          function t() {
            return (e !== null && e.apply(this, arguments)) || this;
          }
          return (
            (t.prototype.flush = function (r) {
              this._active = !0;
              var n = this._scheduled;
              this._scheduled = void 0;
              var i = this.actions,
                a;
              r = r || i.shift();
              do if ((a = r.execute(r.state, r.delay))) break;
              while ((r = i[0]) && r.id === n && i.shift());
              if (((this._active = !1), a)) {
                for (; (r = i[0]) && r.id === n && i.shift(); ) r.unsubscribe();
                throw a;
              }
            }),
            t
          );
        })(Uc.AsyncScheduler);
      (at.AnimationFrameScheduler = Vc),
        (function (e) {
          Object.defineProperty(e, '__esModule', { value: !0 }),
            (e.animationFrame = e.animationFrameScheduler = void 0);
          var t = it,
            r = at;
          (e.animationFrameScheduler = new r.AnimationFrameScheduler(
            t.AnimationFrameAction
          )),
            (e.animationFrame = e.animationFrameScheduler);
        })(ba);
      var Ne = {},
        ma =
          (v && v.__extends) ||
          (function () {
            var e = function (t, r) {
              return (
                (e =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (n, i) {
                      n.__proto__ = i;
                    }) ||
                  function (n, i) {
                    for (var a in i)
                      Object.prototype.hasOwnProperty.call(i, a) &&
                        (n[a] = i[a]);
                  }),
                e(t, r)
              );
            };
            return function (t, r) {
              if (typeof r != 'function' && r !== null)
                throw new TypeError(
                  'Class extends value ' +
                    String(r) +
                    ' is not a constructor or null'
                );
              e(t, r);
              function n() {
                this.constructor = t;
              }
              t.prototype =
                r === null
                  ? Object.create(r)
                  : ((n.prototype = r.prototype), new n());
            };
          })();
      Object.defineProperty(Ne, '__esModule', { value: !0 }),
        (Ne.VirtualAction = Ne.VirtualTimeScheduler = void 0);
      var qc = se,
        zc = R,
        xc = ve,
        Bc = (function (e) {
          ma(t, e);
          function t(r, n) {
            r === void 0 && (r = ha), n === void 0 && (n = 1 / 0);
            var i =
              e.call(this, r, function () {
                return i.frame;
              }) || this;
            return (i.maxFrames = n), (i.frame = 0), (i.index = -1), i;
          }
          return (
            (t.prototype.flush = function () {
              for (
                var r = this, n = r.actions, i = r.maxFrames, a, o;
                (o = n[0]) &&
                o.delay <= i &&
                (n.shift(),
                (this.frame = o.delay),
                !(a = o.execute(o.state, o.delay)));

              );
              if (a) {
                for (; (o = n.shift()); ) o.unsubscribe();
                throw a;
              }
            }),
            (t.frameTimeFactor = 10),
            t
          );
        })(xc.AsyncScheduler);
      Ne.VirtualTimeScheduler = Bc;
      var ha = (function (e) {
        ma(t, e);
        function t(r, n, i) {
          i === void 0 && (i = r.index += 1);
          var a = e.call(this, r, n) || this;
          return (
            (a.scheduler = r),
            (a.work = n),
            (a.index = i),
            (a.active = !0),
            (a.index = r.index = i),
            a
          );
        }
        return (
          (t.prototype.schedule = function (r, n) {
            if ((n === void 0 && (n = 0), Number.isFinite(n))) {
              if (!this.id) return e.prototype.schedule.call(this, r, n);
              this.active = !1;
              var i = new t(this.scheduler, this.work);
              return this.add(i), i.schedule(r, n);
            } else return zc.Subscription.EMPTY;
          }),
          (t.prototype.requestAsyncId = function (r, n, i) {
            i === void 0 && (i = 0), (this.delay = r.frame + i);
            var a = r.actions;
            return a.push(this), a.sort(t.sortActions), 1;
          }),
          (t.prototype.recycleAsyncId = function (r, n, i) {}),
          (t.prototype._execute = function (r, n) {
            if (this.active === !0)
              return e.prototype._execute.call(this, r, n);
          }),
          (t.sortActions = function (r, n) {
            return r.delay === n.delay
              ? r.index === n.index
                ? 0
                : r.index > n.index
                ? 1
                : -1
              : r.delay > n.delay
              ? 1
              : -1;
          }),
          t
        );
      })(qc.AsyncAction);
      Ne.VirtualAction = ha;
      var ot = {},
        D = {};
      (function (e) {
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.empty = e.EMPTY = void 0);
        var t = F;
        e.EMPTY = new t.Observable(function (i) {
          return i.complete();
        });
        function r(i) {
          return i ? n(i) : e.EMPTY;
        }
        e.empty = r;
        function n(i) {
          return new t.Observable(function (a) {
            return i.schedule(function () {
              return a.complete();
            });
          });
        }
      })(D);
      var Ue = {},
        C = {},
        _e = {};
      Object.defineProperty(_e, '__esModule', { value: !0 }),
        (_e.isScheduler = void 0);
      var Dc = E;
      function Yc(e) {
        return e && Dc.isFunction(e.schedule);
      }
      (_e.isScheduler = Yc),
        Object.defineProperty(C, '__esModule', { value: !0 }),
        (C.popNumber = C.popScheduler = C.popResultSelector = void 0);
      var Gc = E,
        Kc = _e;
      function gi(e) {
        return e[e.length - 1];
      }
      function Qc(e) {
        return Gc.isFunction(gi(e)) ? e.pop() : void 0;
      }
      C.popResultSelector = Qc;
      function Jc(e) {
        return Kc.isScheduler(gi(e)) ? e.pop() : void 0;
      }
      C.popScheduler = Jc;
      function Xc(e, t) {
        return typeof gi(e) == 'number' ? e.pop() : t;
      }
      C.popNumber = Xc;
      var Y = {},
        lr = {},
        ut = {},
        w = {},
        Ve = {};
      Object.defineProperty(Ve, '__esModule', { value: !0 }),
        (Ve.isArrayLike = void 0),
        (Ve.isArrayLike = function (e) {
          return e && typeof e.length == 'number' && typeof e != 'function';
        });
      var fr = {};
      Object.defineProperty(fr, '__esModule', { value: !0 }),
        (fr.isPromise = void 0);
      var Zc = E;
      function Hc(e) {
        return Zc.isFunction(e?.then);
      }
      fr.isPromise = Hc;
      var sr = {};
      Object.defineProperty(sr, '__esModule', { value: !0 }),
        (sr.isInteropObservable = void 0);
      var el = he,
        rl = E;
      function tl(e) {
        return rl.isFunction(e[el.observable]);
      }
      sr.isInteropObservable = tl;
      var vr = {};
      Object.defineProperty(vr, '__esModule', { value: !0 }),
        (vr.isAsyncIterable = void 0);
      var nl = E;
      function il(e) {
        return Symbol.asyncIterator && nl.isFunction(e?.[Symbol.asyncIterator]);
      }
      vr.isAsyncIterable = il;
      var dr = {};
      Object.defineProperty(dr, '__esModule', { value: !0 }),
        (dr.createInvalidObservableTypeError = void 0);
      function al(e) {
        return new TypeError(
          'You provided ' +
            (e !== null && typeof e == 'object'
              ? 'an invalid object'
              : "'" + e + "'") +
            ' where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.'
        );
      }
      dr.createInvalidObservableTypeError = al;
      var br = {},
        ge = {};
      Object.defineProperty(ge, '__esModule', { value: !0 }),
        (ge.iterator = ge.getSymbolIterator = void 0);
      function ya() {
        return typeof Symbol != 'function' || !Symbol.iterator
          ? '@@iterator'
          : Symbol.iterator;
      }
      (ge.getSymbolIterator = ya),
        (ge.iterator = ya()),
        Object.defineProperty(br, '__esModule', { value: !0 }),
        (br.isIterable = void 0);
      var ol = ge,
        ul = E;
      function cl(e) {
        return ul.isFunction(e?.[ol.iterator]);
      }
      br.isIterable = cl;
      var de = {},
        ll =
          (v && v.__generator) ||
          function (e, t) {
            var r = {
                label: 0,
                sent: function () {
                  if (a[0] & 1) throw a[1];
                  return a[1];
                },
                trys: [],
                ops: [],
              },
              n,
              i,
              a,
              o;
            return (
              (o = { next: u(0), throw: u(1), return: u(2) }),
              typeof Symbol == 'function' &&
                (o[Symbol.iterator] = function () {
                  return this;
                }),
              o
            );
            function u(c) {
              return function (f) {
                return l([c, f]);
              };
            }
            function l(c) {
              if (n) throw new TypeError('Generator is already executing.');
              for (; r; )
                try {
                  if (
                    ((n = 1),
                    i &&
                      (a =
                        c[0] & 2
                          ? i.return
                          : c[0]
                          ? i.throw || ((a = i.return) && a.call(i), 0)
                          : i.next) &&
                      !(a = a.call(i, c[1])).done)
                  )
                    return a;
                  switch (((i = 0), a && (c = [c[0] & 2, a.value]), c[0])) {
                    case 0:
                    case 1:
                      a = c;
                      break;
                    case 4:
                      return r.label++, { value: c[1], done: !1 };
                    case 5:
                      r.label++, (i = c[1]), (c = [0]);
                      continue;
                    case 7:
                      (c = r.ops.pop()), r.trys.pop();
                      continue;
                    default:
                      if (
                        ((a = r.trys),
                        !(a = a.length > 0 && a[a.length - 1]) &&
                          (c[0] === 6 || c[0] === 2))
                      ) {
                        r = 0;
                        continue;
                      }
                      if (c[0] === 3 && (!a || (c[1] > a[0] && c[1] < a[3]))) {
                        r.label = c[1];
                        break;
                      }
                      if (c[0] === 6 && r.label < a[1]) {
                        (r.label = a[1]), (a = c);
                        break;
                      }
                      if (a && r.label < a[2]) {
                        (r.label = a[2]), r.ops.push(c);
                        break;
                      }
                      a[2] && r.ops.pop(), r.trys.pop();
                      continue;
                  }
                  c = t.call(e, r);
                } catch (f) {
                  (c = [6, f]), (i = 0);
                } finally {
                  n = a = 0;
                }
              if (c[0] & 5) throw c[1];
              return { value: c[0] ? c[1] : void 0, done: !0 };
            }
          },
        qe =
          (v && v.__await) ||
          function (e) {
            return this instanceof qe ? ((this.v = e), this) : new qe(e);
          },
        fl =
          (v && v.__asyncGenerator) ||
          function (e, t, r) {
            if (!Symbol.asyncIterator)
              throw new TypeError('Symbol.asyncIterator is not defined.');
            var n = r.apply(e, t || []),
              i,
              a = [];
            return (
              (i = {}),
              o('next'),
              o('throw'),
              o('return'),
              (i[Symbol.asyncIterator] = function () {
                return this;
              }),
              i
            );
            function o(d) {
              n[d] &&
                (i[d] = function (p) {
                  return new Promise(function (m, b) {
                    a.push([d, p, m, b]) > 1 || u(d, p);
                  });
                });
            }
            function u(d, p) {
              try {
                l(n[d](p));
              } catch (m) {
                s(a[0][3], m);
              }
            }
            function l(d) {
              d.value instanceof qe
                ? Promise.resolve(d.value.v).then(c, f)
                : s(a[0][2], d);
            }
            function c(d) {
              u('next', d);
            }
            function f(d) {
              u('throw', d);
            }
            function s(d, p) {
              d(p), a.shift(), a.length && u(a[0][0], a[0][1]);
            }
          };
      Object.defineProperty(de, '__esModule', { value: !0 }),
        (de.isReadableStreamLike = de.readableStreamLikeToAsyncGenerator =
          void 0);
      var sl = E;
      function vl(e) {
        return fl(this, arguments, function () {
          var r, n, i, a;
          return ll(this, function (o) {
            switch (o.label) {
              case 0:
                (r = e.getReader()), (o.label = 1);
              case 1:
                o.trys.push([1, , 9, 10]), (o.label = 2);
              case 2:
                return [4, qe(r.read())];
              case 3:
                return (
                  (n = o.sent()),
                  (i = n.value),
                  (a = n.done),
                  a ? [4, qe(void 0)] : [3, 5]
                );
              case 4:
                return [2, o.sent()];
              case 5:
                return [4, qe(i)];
              case 6:
                return [4, o.sent()];
              case 7:
                return o.sent(), [3, 2];
              case 8:
                return [3, 10];
              case 9:
                return r.releaseLock(), [7];
              case 10:
                return [2];
            }
          });
        });
      }
      de.readableStreamLikeToAsyncGenerator = vl;
      function dl(e) {
        return sl.isFunction(e?.getReader);
      }
      de.isReadableStreamLike = dl;
      var bl =
          (v && v.__awaiter) ||
          function (e, t, r, n) {
            function i(a) {
              return a instanceof r
                ? a
                : new r(function (o) {
                    o(a);
                  });
            }
            return new (r || (r = Promise))(function (a, o) {
              function u(f) {
                try {
                  c(n.next(f));
                } catch (s) {
                  o(s);
                }
              }
              function l(f) {
                try {
                  c(n.throw(f));
                } catch (s) {
                  o(s);
                }
              }
              function c(f) {
                f.done ? a(f.value) : i(f.value).then(u, l);
              }
              c((n = n.apply(e, t || [])).next());
            });
          },
        pl =
          (v && v.__generator) ||
          function (e, t) {
            var r = {
                label: 0,
                sent: function () {
                  if (a[0] & 1) throw a[1];
                  return a[1];
                },
                trys: [],
                ops: [],
              },
              n,
              i,
              a,
              o;
            return (
              (o = { next: u(0), throw: u(1), return: u(2) }),
              typeof Symbol == 'function' &&
                (o[Symbol.iterator] = function () {
                  return this;
                }),
              o
            );
            function u(c) {
              return function (f) {
                return l([c, f]);
              };
            }
            function l(c) {
              if (n) throw new TypeError('Generator is already executing.');
              for (; r; )
                try {
                  if (
                    ((n = 1),
                    i &&
                      (a =
                        c[0] & 2
                          ? i.return
                          : c[0]
                          ? i.throw || ((a = i.return) && a.call(i), 0)
                          : i.next) &&
                      !(a = a.call(i, c[1])).done)
                  )
                    return a;
                  switch (((i = 0), a && (c = [c[0] & 2, a.value]), c[0])) {
                    case 0:
                    case 1:
                      a = c;
                      break;
                    case 4:
                      return r.label++, { value: c[1], done: !1 };
                    case 5:
                      r.label++, (i = c[1]), (c = [0]);
                      continue;
                    case 7:
                      (c = r.ops.pop()), r.trys.pop();
                      continue;
                    default:
                      if (
                        ((a = r.trys),
                        !(a = a.length > 0 && a[a.length - 1]) &&
                          (c[0] === 6 || c[0] === 2))
                      ) {
                        r = 0;
                        continue;
                      }
                      if (c[0] === 3 && (!a || (c[1] > a[0] && c[1] < a[3]))) {
                        r.label = c[1];
                        break;
                      }
                      if (c[0] === 6 && r.label < a[1]) {
                        (r.label = a[1]), (a = c);
                        break;
                      }
                      if (a && r.label < a[2]) {
                        (r.label = a[2]), r.ops.push(c);
                        break;
                      }
                      a[2] && r.ops.pop(), r.trys.pop();
                      continue;
                  }
                  c = t.call(e, r);
                } catch (f) {
                  (c = [6, f]), (i = 0);
                } finally {
                  n = a = 0;
                }
              if (c[0] & 5) throw c[1];
              return { value: c[0] ? c[1] : void 0, done: !0 };
            }
          },
        ml =
          (v && v.__asyncValues) ||
          function (e) {
            if (!Symbol.asyncIterator)
              throw new TypeError('Symbol.asyncIterator is not defined.');
            var t = e[Symbol.asyncIterator],
              r;
            return t
              ? t.call(e)
              : ((e = typeof Oi == 'function' ? Oi(e) : e[Symbol.iterator]()),
                (r = {}),
                n('next'),
                n('throw'),
                n('return'),
                (r[Symbol.asyncIterator] = function () {
                  return this;
                }),
                r);
            function n(a) {
              r[a] =
                e[a] &&
                function (o) {
                  return new Promise(function (u, l) {
                    (o = e[a](o)), i(u, l, o.done, o.value);
                  });
                };
            }
            function i(a, o, u, l) {
              Promise.resolve(l).then(function (c) {
                a({ value: c, done: u });
              }, o);
            }
          },
        Oi =
          (v && v.__values) ||
          function (e) {
            var t = typeof Symbol == 'function' && Symbol.iterator,
              r = t && e[t],
              n = 0;
            if (r) return r.call(e);
            if (e && typeof e.length == 'number')
              return {
                next: function () {
                  return (
                    e && n >= e.length && (e = void 0),
                    { value: e && e[n++], done: !e }
                  );
                },
              };
            throw new TypeError(
              t ? 'Object is not iterable.' : 'Symbol.iterator is not defined.'
            );
          };
      Object.defineProperty(w, '__esModule', { value: !0 }),
        (w.fromReadableStreamLike =
          w.fromAsyncIterable =
          w.fromIterable =
          w.fromPromise =
          w.fromArrayLike =
          w.fromInteropObservable =
          w.innerFrom =
            void 0);
      var hl = Ve,
        yl = fr,
        ze = F,
        _l = sr,
        gl = vr,
        Ol = dr,
        Sl = br,
        _a = de,
        $l = E,
        wl = ir,
        jl = he;
      function Pl(e) {
        if (e instanceof ze.Observable) return e;
        if (e != null) {
          if (_l.isInteropObservable(e)) return ga(e);
          if (hl.isArrayLike(e)) return Oa(e);
          if (yl.isPromise(e)) return Sa(e);
          if (gl.isAsyncIterable(e)) return Si(e);
          if (Sl.isIterable(e)) return $a(e);
          if (_a.isReadableStreamLike(e)) return wa(e);
        }
        throw Ol.createInvalidObservableTypeError(e);
      }
      w.innerFrom = Pl;
      function ga(e) {
        return new ze.Observable(function (t) {
          var r = e[jl.observable]();
          if ($l.isFunction(r.subscribe)) return r.subscribe(t);
          throw new TypeError(
            'Provided object does not correctly implement Symbol.observable'
          );
        });
      }
      w.fromInteropObservable = ga;
      function Oa(e) {
        return new ze.Observable(function (t) {
          for (var r = 0; r < e.length && !t.closed; r++) t.next(e[r]);
          t.complete();
        });
      }
      w.fromArrayLike = Oa;
      function Sa(e) {
        return new ze.Observable(function (t) {
          e.then(
            function (r) {
              t.closed || (t.next(r), t.complete());
            },
            function (r) {
              return t.error(r);
            }
          ).then(null, wl.reportUnhandledError);
        });
      }
      w.fromPromise = Sa;
      function $a(e) {
        return new ze.Observable(function (t) {
          var r, n;
          try {
            for (var i = Oi(e), a = i.next(); !a.done; a = i.next()) {
              var o = a.value;
              if ((t.next(o), t.closed)) return;
            }
          } catch (u) {
            r = { error: u };
          } finally {
            try {
              a && !a.done && (n = i.return) && n.call(i);
            } finally {
              if (r) throw r.error;
            }
          }
          t.complete();
        });
      }
      w.fromIterable = $a;
      function Si(e) {
        return new ze.Observable(function (t) {
          Al(e, t).catch(function (r) {
            return t.error(r);
          });
        });
      }
      w.fromAsyncIterable = Si;
      function wa(e) {
        return Si(_a.readableStreamLikeToAsyncGenerator(e));
      }
      w.fromReadableStreamLike = wa;
      function Al(e, t) {
        var r, n, i, a;
        return bl(this, void 0, void 0, function () {
          var o, u;
          return pl(this, function (l) {
            switch (l.label) {
              case 0:
                l.trys.push([0, 5, 6, 11]), (r = ml(e)), (l.label = 1);
              case 1:
                return [4, r.next()];
              case 2:
                if (((n = l.sent()), !!n.done)) return [3, 4];
                if (((o = n.value), t.next(o), t.closed)) return [2];
                l.label = 3;
              case 3:
                return [3, 1];
              case 4:
                return [3, 11];
              case 5:
                return (u = l.sent()), (i = { error: u }), [3, 11];
              case 6:
                return (
                  l.trys.push([6, , 9, 10]),
                  n && !n.done && (a = r.return) ? [4, a.call(r)] : [3, 8]
                );
              case 7:
                l.sent(), (l.label = 8);
              case 8:
                return [3, 10];
              case 9:
                if (i) throw i.error;
                return [7];
              case 10:
                return [7];
              case 11:
                return t.complete(), [2];
            }
          });
        });
      }
      var Oe = {},
        G = {};
      Object.defineProperty(G, '__esModule', { value: !0 }),
        (G.executeSchedule = void 0);
      function El(e, t, r, n, i) {
        n === void 0 && (n = 0), i === void 0 && (i = !1);
        var a = t.schedule(function () {
          r(), i ? e.add(this.schedule(null, n)) : this.unsubscribe();
        }, n);
        if ((e.add(a), !i)) return a;
      }
      (G.executeSchedule = El),
        Object.defineProperty(Oe, '__esModule', { value: !0 }),
        (Oe.observeOn = void 0);
      var $i = G,
        Ml = y,
        Fl = $;
      function Tl(e, t) {
        return (
          t === void 0 && (t = 0),
          Ml.operate(function (r, n) {
            r.subscribe(
              Fl.createOperatorSubscriber(
                n,
                function (i) {
                  return $i.executeSchedule(
                    n,
                    e,
                    function () {
                      return n.next(i);
                    },
                    t
                  );
                },
                function () {
                  return $i.executeSchedule(
                    n,
                    e,
                    function () {
                      return n.complete();
                    },
                    t
                  );
                },
                function (i) {
                  return $i.executeSchedule(
                    n,
                    e,
                    function () {
                      return n.error(i);
                    },
                    t
                  );
                }
              )
            );
          })
        );
      }
      Oe.observeOn = Tl;
      var Se = {};
      Object.defineProperty(Se, '__esModule', { value: !0 }),
        (Se.subscribeOn = void 0);
      var Il = y;
      function Cl(e, t) {
        return (
          t === void 0 && (t = 0),
          Il.operate(function (r, n) {
            n.add(
              e.schedule(function () {
                return r.subscribe(n);
              }, t)
            );
          })
        );
      }
      (Se.subscribeOn = Cl),
        Object.defineProperty(ut, '__esModule', { value: !0 }),
        (ut.scheduleObservable = void 0);
      var kl = w,
        Rl = Oe,
        Wl = Se;
      function Ll(e, t) {
        return kl.innerFrom(e).pipe(Wl.subscribeOn(t), Rl.observeOn(t));
      }
      ut.scheduleObservable = Ll;
      var ct = {};
      Object.defineProperty(ct, '__esModule', { value: !0 }),
        (ct.schedulePromise = void 0);
      var Nl = w,
        Ul = Oe,
        Vl = Se;
      function ql(e, t) {
        return Nl.innerFrom(e).pipe(Vl.subscribeOn(t), Ul.observeOn(t));
      }
      ct.schedulePromise = ql;
      var lt = {};
      Object.defineProperty(lt, '__esModule', { value: !0 }),
        (lt.scheduleArray = void 0);
      var zl = F;
      function xl(e, t) {
        return new zl.Observable(function (r) {
          var n = 0;
          return t.schedule(function () {
            n === e.length
              ? r.complete()
              : (r.next(e[n++]), r.closed || this.schedule());
          });
        });
      }
      lt.scheduleArray = xl;
      var pr = {};
      Object.defineProperty(pr, '__esModule', { value: !0 }),
        (pr.scheduleIterable = void 0);
      var Bl = F,
        Dl = ge,
        Yl = E,
        ja = G;
      function Gl(e, t) {
        return new Bl.Observable(function (r) {
          var n;
          return (
            ja.executeSchedule(r, t, function () {
              (n = e[Dl.iterator]()),
                ja.executeSchedule(
                  r,
                  t,
                  function () {
                    var i, a, o;
                    try {
                      (i = n.next()), (a = i.value), (o = i.done);
                    } catch (u) {
                      r.error(u);
                      return;
                    }
                    o ? r.complete() : r.next(a);
                  },
                  0,
                  !0
                );
            }),
            function () {
              return Yl.isFunction(n?.return) && n.return();
            }
          );
        });
      }
      pr.scheduleIterable = Gl;
      var mr = {};
      Object.defineProperty(mr, '__esModule', { value: !0 }),
        (mr.scheduleAsyncIterable = void 0);
      var Kl = F,
        Pa = G;
      function Ql(e, t) {
        if (!e) throw new Error('Iterable cannot be null');
        return new Kl.Observable(function (r) {
          Pa.executeSchedule(r, t, function () {
            var n = e[Symbol.asyncIterator]();
            Pa.executeSchedule(
              r,
              t,
              function () {
                n.next().then(function (i) {
                  i.done ? r.complete() : r.next(i.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      mr.scheduleAsyncIterable = Ql;
      var ft = {};
      Object.defineProperty(ft, '__esModule', { value: !0 }),
        (ft.scheduleReadableStreamLike = void 0);
      var Jl = mr,
        Xl = de;
      function Zl(e, t) {
        return Jl.scheduleAsyncIterable(
          Xl.readableStreamLikeToAsyncGenerator(e),
          t
        );
      }
      (ft.scheduleReadableStreamLike = Zl),
        Object.defineProperty(lr, '__esModule', { value: !0 }),
        (lr.scheduled = void 0);
      var Hl = ut,
        ef = ct,
        rf = lt,
        tf = pr,
        nf = mr,
        af = sr,
        of = fr,
        uf = Ve,
        cf = br,
        lf = vr,
        ff = dr,
        sf = de,
        vf = ft;
      function df(e, t) {
        if (e != null) {
          if (af.isInteropObservable(e)) return Hl.scheduleObservable(e, t);
          if (uf.isArrayLike(e)) return rf.scheduleArray(e, t);
          if (of.isPromise(e)) return ef.schedulePromise(e, t);
          if (lf.isAsyncIterable(e)) return nf.scheduleAsyncIterable(e, t);
          if (cf.isIterable(e)) return tf.scheduleIterable(e, t);
          if (sf.isReadableStreamLike(e))
            return vf.scheduleReadableStreamLike(e, t);
        }
        throw ff.createInvalidObservableTypeError(e);
      }
      (lr.scheduled = df),
        Object.defineProperty(Y, '__esModule', { value: !0 }),
        (Y.from = void 0);
      var bf = lr,
        pf = w;
      function mf(e, t) {
        return t ? bf.scheduled(e, t) : pf.innerFrom(e);
      }
      (Y.from = mf),
        Object.defineProperty(Ue, '__esModule', { value: !0 }),
        (Ue.of = void 0);
      var hf = C,
        yf = Y;
      function _f() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        var r = hf.popScheduler(e);
        return yf.from(e, r);
      }
      Ue.of = _f;
      var hr = {};
      Object.defineProperty(hr, '__esModule', { value: !0 }),
        (hr.throwError = void 0);
      var gf = F,
        Of = E;
      function Sf(e, t) {
        var r = Of.isFunction(e)
            ? e
            : function () {
                return e;
              },
          n = function (i) {
            return i.error(r());
          };
        return new gf.Observable(
          t
            ? function (i) {
                return t.schedule(n, 0, i);
              }
            : n
        );
      }
      (hr.throwError = Sf),
        (function (e) {
          Object.defineProperty(e, '__esModule', { value: !0 }),
            (e.observeNotification =
              e.Notification =
              e.NotificationKind =
                void 0);
          var t = D,
            r = Ue,
            n = hr,
            i = E;
          (function (u) {
            (u.NEXT = 'N'), (u.ERROR = 'E'), (u.COMPLETE = 'C');
          })(e.NotificationKind || (e.NotificationKind = {}));
          var a = (function () {
            function u(l, c, f) {
              (this.kind = l),
                (this.value = c),
                (this.error = f),
                (this.hasValue = l === 'N');
            }
            return (
              (u.prototype.observe = function (l) {
                return o(this, l);
              }),
              (u.prototype.do = function (l, c, f) {
                var s = this,
                  d = s.kind,
                  p = s.value,
                  m = s.error;
                return d === 'N' ? l?.(p) : d === 'E' ? c?.(m) : f?.();
              }),
              (u.prototype.accept = function (l, c, f) {
                var s;
                return i.isFunction(
                  (s = l) === null || s === void 0 ? void 0 : s.next
                )
                  ? this.observe(l)
                  : this.do(l, c, f);
              }),
              (u.prototype.toObservable = function () {
                var l = this,
                  c = l.kind,
                  f = l.value,
                  s = l.error,
                  d =
                    c === 'N'
                      ? r.of(f)
                      : c === 'E'
                      ? n.throwError(function () {
                          return s;
                        })
                      : c === 'C'
                      ? t.EMPTY
                      : 0;
                if (!d)
                  throw new TypeError('Unexpected notification kind ' + c);
                return d;
              }),
              (u.createNext = function (l) {
                return new u('N', l);
              }),
              (u.createError = function (l) {
                return new u('E', void 0, l);
              }),
              (u.createComplete = function () {
                return u.completeNotification;
              }),
              (u.completeNotification = new u('C')),
              u
            );
          })();
          e.Notification = a;
          function o(u, l) {
            var c,
              f,
              s,
              d = u,
              p = d.kind,
              m = d.value,
              b = d.error;
            if (typeof p != 'string')
              throw new TypeError('Invalid notification, missing "kind"');
            p === 'N'
              ? (c = l.next) === null || c === void 0 || c.call(l, m)
              : p === 'E'
              ? (f = l.error) === null || f === void 0 || f.call(l, b)
              : (s = l.complete) === null || s === void 0 || s.call(l);
          }
          e.observeNotification = o;
        })(ot);
      var st = {};
      Object.defineProperty(st, '__esModule', { value: !0 }),
        (st.isObservable = void 0);
      var $f = F,
        Aa = E;
      function wf(e) {
        return (
          !!e &&
          (e instanceof $f.Observable ||
            (Aa.isFunction(e.lift) && Aa.isFunction(e.subscribe)))
        );
      }
      st.isObservable = wf;
      var vt = {},
        Z = {};
      Object.defineProperty(Z, '__esModule', { value: !0 }),
        (Z.EmptyError = void 0);
      var jf = J;
      (Z.EmptyError = jf.createErrorClass(function (e) {
        return function () {
          e(this),
            (this.name = 'EmptyError'),
            (this.message = 'no elements in sequence');
        };
      })),
        Object.defineProperty(vt, '__esModule', { value: !0 }),
        (vt.lastValueFrom = void 0);
      var Pf = Z;
      function Af(e, t) {
        var r = typeof t == 'object';
        return new Promise(function (n, i) {
          var a = !1,
            o;
          e.subscribe({
            next: function (u) {
              (o = u), (a = !0);
            },
            error: i,
            complete: function () {
              a ? n(o) : r ? n(t.defaultValue) : i(new Pf.EmptyError());
            },
          });
        });
      }
      vt.lastValueFrom = Af;
      var dt = {};
      Object.defineProperty(dt, '__esModule', { value: !0 }),
        (dt.firstValueFrom = void 0);
      var Ef = Z,
        Mf = ke;
      function Ff(e, t) {
        var r = typeof t == 'object';
        return new Promise(function (n, i) {
          var a = new Mf.SafeSubscriber({
            next: function (o) {
              n(o), a.unsubscribe();
            },
            error: i,
            complete: function () {
              r ? n(t.defaultValue) : i(new Ef.EmptyError());
            },
          });
          e.subscribe(a);
        });
      }
      dt.firstValueFrom = Ff;
      var yr = {};
      Object.defineProperty(yr, '__esModule', { value: !0 }),
        (yr.ArgumentOutOfRangeError = void 0);
      var Tf = J;
      yr.ArgumentOutOfRangeError = Tf.createErrorClass(function (e) {
        return function () {
          e(this),
            (this.name = 'ArgumentOutOfRangeError'),
            (this.message = 'argument out of range');
        };
      });
      var _r = {};
      Object.defineProperty(_r, '__esModule', { value: !0 }),
        (_r.NotFoundError = void 0);
      var If = J;
      _r.NotFoundError = If.createErrorClass(function (e) {
        return function (r) {
          e(this), (this.name = 'NotFoundError'), (this.message = r);
        };
      });
      var gr = {};
      Object.defineProperty(gr, '__esModule', { value: !0 }),
        (gr.SequenceError = void 0);
      var Cf = J;
      gr.SequenceError = Cf.createErrorClass(function (e) {
        return function (r) {
          e(this), (this.name = 'SequenceError'), (this.message = r);
        };
      });
      var bt = {},
        xe = {};
      Object.defineProperty(xe, '__esModule', { value: !0 }),
        (xe.isValidDate = void 0);
      function kf(e) {
        return e instanceof Date && !isNaN(e);
      }
      (xe.isValidDate = kf),
        (function (e) {
          Object.defineProperty(e, '__esModule', { value: !0 }),
            (e.timeout = e.TimeoutError = void 0);
          var t = q,
            r = xe,
            n = y,
            i = w,
            a = J,
            o = $,
            u = G;
          e.TimeoutError = a.createErrorClass(function (f) {
            return function (d) {
              d === void 0 && (d = null),
                f(this),
                (this.message = 'Timeout has occurred'),
                (this.name = 'TimeoutError'),
                (this.info = d);
            };
          });
          function l(f, s) {
            var d = r.isValidDate(f)
                ? { first: f }
                : typeof f == 'number'
                ? { each: f }
                : f,
              p = d.first,
              m = d.each,
              b = d.with,
              h = b === void 0 ? c : b,
              g = d.scheduler,
              _ = g === void 0 ? s ?? t.asyncScheduler : g,
              O = d.meta,
              S = O === void 0 ? null : O;
            if (p == null && m == null)
              throw new TypeError('No timeout provided.');
            return n.operate(function (j, A) {
              var P,
                U,
                Q = null,
                Yr = 0,
                li = function (Gr) {
                  U = u.executeSchedule(
                    A,
                    _,
                    function () {
                      try {
                        P.unsubscribe(),
                          i
                            .innerFrom(h({ meta: S, lastValue: Q, seen: Yr }))
                            .subscribe(A);
                      } catch (Vi) {
                        A.error(Vi);
                      }
                    },
                    Gr
                  );
                };
              (P = j.subscribe(
                o.createOperatorSubscriber(
                  A,
                  function (Gr) {
                    U?.unsubscribe(), Yr++, A.next((Q = Gr)), m > 0 && li(m);
                  },
                  void 0,
                  void 0,
                  function () {
                    U?.closed || U?.unsubscribe(), (Q = null);
                  }
                )
              )),
                !Yr &&
                  li(p != null ? (typeof p == 'number' ? p : +p - _.now()) : m);
            });
          }
          e.timeout = l;
          function c(f) {
            throw new e.TimeoutError(f);
          }
        })(bt);
      var pt = {},
        Or = {},
        H = {},
        ee = {};
      Object.defineProperty(ee, '__esModule', { value: !0 }), (ee.map = void 0);
      var Rf = y,
        Wf = $;
      function Lf(e, t) {
        return Rf.operate(function (r, n) {
          var i = 0;
          r.subscribe(
            Wf.createOperatorSubscriber(n, function (a) {
              n.next(e.call(t, a, i++));
            })
          );
        });
      }
      ee.map = Lf;
      var Nf =
          (v && v.__read) ||
          function (e, t) {
            var r = typeof Symbol == 'function' && e[Symbol.iterator];
            if (!r) return e;
            var n = r.call(e),
              i,
              a = [],
              o;
            try {
              for (; (t === void 0 || t-- > 0) && !(i = n.next()).done; )
                a.push(i.value);
            } catch (u) {
              o = { error: u };
            } finally {
              try {
                i && !i.done && (r = n.return) && r.call(n);
              } finally {
                if (o) throw o.error;
              }
            }
            return a;
          },
        Uf =
          (v && v.__spreadArray) ||
          function (e, t) {
            for (var r = 0, n = t.length, i = e.length; r < n; r++, i++)
              e[i] = t[r];
            return e;
          };
      Object.defineProperty(H, '__esModule', { value: !0 }),
        (H.mapOneOrManyArgs = void 0);
      var Vf = ee,
        qf = Array.isArray;
      function zf(e, t) {
        return qf(t) ? e.apply(void 0, Uf([], Nf(t))) : e(t);
      }
      function xf(e) {
        return Vf.map(function (t) {
          return zf(e, t);
        });
      }
      H.mapOneOrManyArgs = xf;
      var Bf =
          (v && v.__read) ||
          function (e, t) {
            var r = typeof Symbol == 'function' && e[Symbol.iterator];
            if (!r) return e;
            var n = r.call(e),
              i,
              a = [],
              o;
            try {
              for (; (t === void 0 || t-- > 0) && !(i = n.next()).done; )
                a.push(i.value);
            } catch (u) {
              o = { error: u };
            } finally {
              try {
                i && !i.done && (r = n.return) && r.call(n);
              } finally {
                if (o) throw o.error;
              }
            }
            return a;
          },
        Ea =
          (v && v.__spreadArray) ||
          function (e, t) {
            for (var r = 0, n = t.length, i = e.length; r < n; r++, i++)
              e[i] = t[r];
            return e;
          };
      Object.defineProperty(Or, '__esModule', { value: !0 }),
        (Or.bindCallbackInternals = void 0);
      var Df = _e,
        Yf = F,
        Gf = Se,
        Kf = H,
        Qf = Oe,
        Jf = We;
      function wi(e, t, r, n) {
        if (r)
          if (Df.isScheduler(r)) n = r;
          else
            return function () {
              for (var i = [], a = 0; a < arguments.length; a++)
                i[a] = arguments[a];
              return wi(e, t, n).apply(this, i).pipe(Kf.mapOneOrManyArgs(r));
            };
        return n
          ? function () {
              for (var i = [], a = 0; a < arguments.length; a++)
                i[a] = arguments[a];
              return wi(e, t)
                .apply(this, i)
                .pipe(Gf.subscribeOn(n), Qf.observeOn(n));
            }
          : function () {
              for (var i = this, a = [], o = 0; o < arguments.length; o++)
                a[o] = arguments[o];
              var u = new Jf.AsyncSubject(),
                l = !0;
              return new Yf.Observable(function (c) {
                var f = u.subscribe(c);
                if (l) {
                  l = !1;
                  var s = !1,
                    d = !1;
                  t.apply(
                    i,
                    Ea(Ea([], Bf(a)), [
                      function () {
                        for (var p = [], m = 0; m < arguments.length; m++)
                          p[m] = arguments[m];
                        if (e) {
                          var b = p.shift();
                          if (b != null) {
                            u.error(b);
                            return;
                          }
                        }
                        u.next(1 < p.length ? p : p[0]),
                          (d = !0),
                          s && u.complete();
                      },
                    ])
                  ),
                    d && u.complete(),
                    (s = !0);
                }
                return f;
              });
            };
      }
      (Or.bindCallbackInternals = wi),
        Object.defineProperty(pt, '__esModule', { value: !0 }),
        (pt.bindCallback = void 0);
      var Xf = Or;
      function Zf(e, t, r) {
        return Xf.bindCallbackInternals(!1, e, t, r);
      }
      pt.bindCallback = Zf;
      var mt = {};
      Object.defineProperty(mt, '__esModule', { value: !0 }),
        (mt.bindNodeCallback = void 0);
      var Hf = Or;
      function es(e, t, r) {
        return Hf.bindCallbackInternals(!0, e, t, r);
      }
      mt.bindNodeCallback = es;
      var be = {},
        Sr = {};
      Object.defineProperty(Sr, '__esModule', { value: !0 }),
        (Sr.argsArgArrayOrObject = void 0);
      var rs = Array.isArray,
        ts = Object.getPrototypeOf,
        ns = Object.prototype,
        is = Object.keys;
      function as(e) {
        if (e.length === 1) {
          var t = e[0];
          if (rs(t)) return { args: t, keys: null };
          if (os(t)) {
            var r = is(t);
            return {
              args: r.map(function (n) {
                return t[n];
              }),
              keys: r,
            };
          }
        }
        return { args: e, keys: null };
      }
      Sr.argsArgArrayOrObject = as;
      function os(e) {
        return e && typeof e == 'object' && ts(e) === ns;
      }
      var $r = {};
      Object.defineProperty($r, '__esModule', { value: !0 }),
        ($r.createObject = void 0);
      function us(e, t) {
        return e.reduce(function (r, n, i) {
          return (r[n] = t[i]), r;
        }, {});
      }
      ($r.createObject = us),
        Object.defineProperty(be, '__esModule', { value: !0 }),
        (be.combineLatestInit = be.combineLatest = void 0);
      var cs = F,
        ls = Sr,
        Ma = Y,
        Fa = L,
        fs = H,
        Ta = C,
        ss = $r,
        vs = $,
        ds = G;
      function bs() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        var r = Ta.popScheduler(e),
          n = Ta.popResultSelector(e),
          i = ls.argsArgArrayOrObject(e),
          a = i.args,
          o = i.keys;
        if (a.length === 0) return Ma.from([], r);
        var u = new cs.Observable(
          Ia(
            a,
            r,
            o
              ? function (l) {
                  return ss.createObject(o, l);
                }
              : Fa.identity
          )
        );
        return n ? u.pipe(fs.mapOneOrManyArgs(n)) : u;
      }
      be.combineLatest = bs;
      function Ia(e, t, r) {
        return (
          r === void 0 && (r = Fa.identity),
          function (n) {
            Ca(
              t,
              function () {
                for (
                  var i = e.length,
                    a = new Array(i),
                    o = i,
                    u = i,
                    l = function (f) {
                      Ca(
                        t,
                        function () {
                          var s = Ma.from(e[f], t),
                            d = !1;
                          s.subscribe(
                            vs.createOperatorSubscriber(
                              n,
                              function (p) {
                                (a[f] = p),
                                  d || ((d = !0), u--),
                                  u || n.next(r(a.slice()));
                              },
                              function () {
                                --o || n.complete();
                              }
                            )
                          );
                        },
                        n
                      );
                    },
                    c = 0;
                  c < i;
                  c++
                )
                  l(c);
              },
              n
            );
          }
        );
      }
      be.combineLatestInit = Ia;
      function Ca(e, t, r) {
        e ? ds.executeSchedule(r, e, t) : t();
      }
      var $e = {},
        Be = {},
        we = {},
        K = {},
        De = {};
      Object.defineProperty(De, '__esModule', { value: !0 }),
        (De.mergeInternals = void 0);
      var ps = w,
        ms = G,
        ka = $;
      function hs(e, t, r, n, i, a, o, u) {
        var l = [],
          c = 0,
          f = 0,
          s = !1,
          d = function () {
            s && !l.length && !c && t.complete();
          },
          p = function (b) {
            return c < n ? m(b) : l.push(b);
          },
          m = function (b) {
            a && t.next(b), c++;
            var h = !1;
            ps.innerFrom(r(b, f++)).subscribe(
              ka.createOperatorSubscriber(
                t,
                function (g) {
                  i?.(g), a ? p(g) : t.next(g);
                },
                function () {
                  h = !0;
                },
                void 0,
                function () {
                  if (h)
                    try {
                      c--;
                      for (
                        var g = function () {
                          var _ = l.shift();
                          o
                            ? ms.executeSchedule(t, o, function () {
                                return m(_);
                              })
                            : m(_);
                        };
                        l.length && c < n;

                      )
                        g();
                      d();
                    } catch (_) {
                      t.error(_);
                    }
                }
              )
            );
          };
        return (
          e.subscribe(
            ka.createOperatorSubscriber(t, p, function () {
              (s = !0), d();
            })
          ),
          function () {
            u?.();
          }
        );
      }
      (De.mergeInternals = hs),
        Object.defineProperty(K, '__esModule', { value: !0 }),
        (K.mergeMap = void 0);
      var ys = ee,
        _s = w,
        gs = y,
        Os = De,
        Ss = E;
      function Ra(e, t, r) {
        return (
          r === void 0 && (r = 1 / 0),
          Ss.isFunction(t)
            ? Ra(function (n, i) {
                return ys.map(function (a, o) {
                  return t(n, a, i, o);
                })(_s.innerFrom(e(n, i)));
              }, r)
            : (typeof t == 'number' && (r = t),
              gs.operate(function (n, i) {
                return Os.mergeInternals(n, i, e, r);
              }))
        );
      }
      (K.mergeMap = Ra),
        Object.defineProperty(we, '__esModule', { value: !0 }),
        (we.mergeAll = void 0);
      var $s = K,
        ws = L;
      function js(e) {
        return e === void 0 && (e = 1 / 0), $s.mergeMap(ws.identity, e);
      }
      (we.mergeAll = js),
        Object.defineProperty(Be, '__esModule', { value: !0 }),
        (Be.concatAll = void 0);
      var Ps = we;
      function As() {
        return Ps.mergeAll(1);
      }
      (Be.concatAll = As),
        Object.defineProperty($e, '__esModule', { value: !0 }),
        ($e.concat = void 0);
      var Es = Be,
        Ms = C,
        Fs = Y;
      function Ts() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        return Es.concatAll()(Fs.from(e, Ms.popScheduler(e)));
      }
      $e.concat = Ts;
      var ht = {},
        je = {};
      Object.defineProperty(je, '__esModule', { value: !0 }),
        (je.defer = void 0);
      var Is = F,
        Cs = w;
      function ks(e) {
        return new Is.Observable(function (t) {
          Cs.innerFrom(e()).subscribe(t);
        });
      }
      (je.defer = ks),
        Object.defineProperty(ht, '__esModule', { value: !0 }),
        (ht.connectable = void 0);
      var Rs = I,
        Ws = F,
        Ls = je,
        Ns = {
          connector: function () {
            return new Rs.Subject();
          },
          resetOnDisconnect: !0,
        };
      function Us(e, t) {
        t === void 0 && (t = Ns);
        var r = null,
          n = t.connector,
          i = t.resetOnDisconnect,
          a = i === void 0 ? !0 : i,
          o = n(),
          u = new Ws.Observable(function (l) {
            return o.subscribe(l);
          });
        return (
          (u.connect = function () {
            return (
              (!r || r.closed) &&
                ((r = Ls.defer(function () {
                  return e;
                }).subscribe(o)),
                a &&
                  r.add(function () {
                    return (o = n());
                  })),
              r
            );
          }),
          u
        );
      }
      ht.connectable = Us;
      var yt = {};
      Object.defineProperty(yt, '__esModule', { value: !0 }),
        (yt.forkJoin = void 0);
      var Vs = F,
        qs = Sr,
        zs = w,
        xs = C,
        Bs = $,
        Ds = H,
        Ys = $r;
      function Gs() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        var r = xs.popResultSelector(e),
          n = qs.argsArgArrayOrObject(e),
          i = n.args,
          a = n.keys,
          o = new Vs.Observable(function (u) {
            var l = i.length;
            if (!l) {
              u.complete();
              return;
            }
            for (
              var c = new Array(l),
                f = l,
                s = l,
                d = function (m) {
                  var b = !1;
                  zs.innerFrom(i[m]).subscribe(
                    Bs.createOperatorSubscriber(
                      u,
                      function (h) {
                        b || ((b = !0), s--), (c[m] = h);
                      },
                      function () {
                        return f--;
                      },
                      void 0,
                      function () {
                        (!f || !b) &&
                          (s || u.next(a ? Ys.createObject(a, c) : c),
                          u.complete());
                      }
                    )
                  );
                },
                p = 0;
              p < l;
              p++
            )
              d(p);
          });
        return r ? o.pipe(Ds.mapOneOrManyArgs(r)) : o;
      }
      yt.forkJoin = Gs;
      var _t = {},
        Ks =
          (v && v.__read) ||
          function (e, t) {
            var r = typeof Symbol == 'function' && e[Symbol.iterator];
            if (!r) return e;
            var n = r.call(e),
              i,
              a = [],
              o;
            try {
              for (; (t === void 0 || t-- > 0) && !(i = n.next()).done; )
                a.push(i.value);
            } catch (u) {
              o = { error: u };
            } finally {
              try {
                i && !i.done && (r = n.return) && r.call(n);
              } finally {
                if (o) throw o.error;
              }
            }
            return a;
          };
      Object.defineProperty(_t, '__esModule', { value: !0 }),
        (_t.fromEvent = void 0);
      var Qs = w,
        Js = F,
        Xs = K,
        Zs = Ve,
        Pe = E,
        Hs = H,
        ev = ['addListener', 'removeListener'],
        rv = ['addEventListener', 'removeEventListener'],
        tv = ['on', 'off'];
      function ji(e, t, r, n) {
        if ((Pe.isFunction(r) && ((n = r), (r = void 0)), n))
          return ji(e, t, r).pipe(Hs.mapOneOrManyArgs(n));
        var i = Ks(
            av(e)
              ? rv.map(function (u) {
                  return function (l) {
                    return e[u](t, l, r);
                  };
                })
              : nv(e)
              ? ev.map(Wa(e, t))
              : iv(e)
              ? tv.map(Wa(e, t))
              : [],
            2
          ),
          a = i[0],
          o = i[1];
        if (!a && Zs.isArrayLike(e))
          return Xs.mergeMap(function (u) {
            return ji(u, t, r);
          })(Qs.innerFrom(e));
        if (!a) throw new TypeError('Invalid event target');
        return new Js.Observable(function (u) {
          var l = function () {
            for (var c = [], f = 0; f < arguments.length; f++)
              c[f] = arguments[f];
            return u.next(1 < c.length ? c : c[0]);
          };
          return (
            a(l),
            function () {
              return o(l);
            }
          );
        });
      }
      _t.fromEvent = ji;
      function Wa(e, t) {
        return function (r) {
          return function (n) {
            return e[r](t, n);
          };
        };
      }
      function nv(e) {
        return Pe.isFunction(e.addListener) && Pe.isFunction(e.removeListener);
      }
      function iv(e) {
        return Pe.isFunction(e.on) && Pe.isFunction(e.off);
      }
      function av(e) {
        return (
          Pe.isFunction(e.addEventListener) &&
          Pe.isFunction(e.removeEventListener)
        );
      }
      var gt = {};
      Object.defineProperty(gt, '__esModule', { value: !0 }),
        (gt.fromEventPattern = void 0);
      var ov = F,
        uv = E,
        cv = H;
      function La(e, t, r) {
        return r
          ? La(e, t).pipe(cv.mapOneOrManyArgs(r))
          : new ov.Observable(function (n) {
              var i = function () {
                  for (var o = [], u = 0; u < arguments.length; u++)
                    o[u] = arguments[u];
                  return n.next(o.length === 1 ? o[0] : o);
                },
                a = e(i);
              return uv.isFunction(t)
                ? function () {
                    return t(i, a);
                  }
                : void 0;
            });
      }
      gt.fromEventPattern = La;
      var Ot = {},
        lv =
          (v && v.__generator) ||
          function (e, t) {
            var r = {
                label: 0,
                sent: function () {
                  if (a[0] & 1) throw a[1];
                  return a[1];
                },
                trys: [],
                ops: [],
              },
              n,
              i,
              a,
              o;
            return (
              (o = { next: u(0), throw: u(1), return: u(2) }),
              typeof Symbol == 'function' &&
                (o[Symbol.iterator] = function () {
                  return this;
                }),
              o
            );
            function u(c) {
              return function (f) {
                return l([c, f]);
              };
            }
            function l(c) {
              if (n) throw new TypeError('Generator is already executing.');
              for (; r; )
                try {
                  if (
                    ((n = 1),
                    i &&
                      (a =
                        c[0] & 2
                          ? i.return
                          : c[0]
                          ? i.throw || ((a = i.return) && a.call(i), 0)
                          : i.next) &&
                      !(a = a.call(i, c[1])).done)
                  )
                    return a;
                  switch (((i = 0), a && (c = [c[0] & 2, a.value]), c[0])) {
                    case 0:
                    case 1:
                      a = c;
                      break;
                    case 4:
                      return r.label++, { value: c[1], done: !1 };
                    case 5:
                      r.label++, (i = c[1]), (c = [0]);
                      continue;
                    case 7:
                      (c = r.ops.pop()), r.trys.pop();
                      continue;
                    default:
                      if (
                        ((a = r.trys),
                        !(a = a.length > 0 && a[a.length - 1]) &&
                          (c[0] === 6 || c[0] === 2))
                      ) {
                        r = 0;
                        continue;
                      }
                      if (c[0] === 3 && (!a || (c[1] > a[0] && c[1] < a[3]))) {
                        r.label = c[1];
                        break;
                      }
                      if (c[0] === 6 && r.label < a[1]) {
                        (r.label = a[1]), (a = c);
                        break;
                      }
                      if (a && r.label < a[2]) {
                        (r.label = a[2]), r.ops.push(c);
                        break;
                      }
                      a[2] && r.ops.pop(), r.trys.pop();
                      continue;
                  }
                  c = t.call(e, r);
                } catch (f) {
                  (c = [6, f]), (i = 0);
                } finally {
                  n = a = 0;
                }
              if (c[0] & 5) throw c[1];
              return { value: c[0] ? c[1] : void 0, done: !0 };
            }
          };
      Object.defineProperty(Ot, '__esModule', { value: !0 }),
        (Ot.generate = void 0);
      var Na = L,
        fv = _e,
        sv = je,
        vv = pr;
      function dv(e, t, r, n, i) {
        var a, o, u, l;
        arguments.length === 1
          ? ((a = e),
            (l = a.initialState),
            (t = a.condition),
            (r = a.iterate),
            (o = a.resultSelector),
            (u = o === void 0 ? Na.identity : o),
            (i = a.scheduler))
          : ((l = e),
            !n || fv.isScheduler(n) ? ((u = Na.identity), (i = n)) : (u = n));
        function c() {
          var f;
          return lv(this, function (s) {
            switch (s.label) {
              case 0:
                (f = l), (s.label = 1);
              case 1:
                return !t || t(f) ? [4, u(f)] : [3, 4];
              case 2:
                s.sent(), (s.label = 3);
              case 3:
                return (f = r(f)), [3, 1];
              case 4:
                return [2];
            }
          });
        }
        return sv.defer(
          i
            ? function () {
                return vv.scheduleIterable(c(), i);
              }
            : c
        );
      }
      Ot.generate = dv;
      var St = {};
      Object.defineProperty(St, '__esModule', { value: !0 }), (St.iif = void 0);
      var bv = je;
      function pv(e, t, r) {
        return bv.defer(function () {
          return e() ? t : r;
        });
      }
      St.iif = pv;
      var wr = {},
        re = {};
      Object.defineProperty(re, '__esModule', { value: !0 }),
        (re.timer = void 0);
      var mv = F,
        hv = q,
        yv = _e,
        _v = xe;
      function gv(e, t, r) {
        e === void 0 && (e = 0), r === void 0 && (r = hv.async);
        var n = -1;
        return (
          t != null && (yv.isScheduler(t) ? (r = t) : (n = t)),
          new mv.Observable(function (i) {
            var a = _v.isValidDate(e) ? +e - r.now() : e;
            a < 0 && (a = 0);
            var o = 0;
            return r.schedule(function () {
              i.closed ||
                (i.next(o++), 0 <= n ? this.schedule(void 0, n) : i.complete());
            }, a);
          })
        );
      }
      (re.timer = gv),
        Object.defineProperty(wr, '__esModule', { value: !0 }),
        (wr.interval = void 0);
      var Ov = q,
        Sv = re;
      function $v(e, t) {
        return (
          e === void 0 && (e = 0),
          t === void 0 && (t = Ov.asyncScheduler),
          e < 0 && (e = 0),
          Sv.timer(e, e, t)
        );
      }
      wr.interval = $v;
      var $t = {};
      Object.defineProperty($t, '__esModule', { value: !0 }),
        ($t.merge = void 0);
      var wv = we,
        jv = w,
        Pv = D,
        Ua = C,
        Av = Y;
      function Ev() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        var r = Ua.popScheduler(e),
          n = Ua.popNumber(e, 1 / 0),
          i = e;
        return i.length
          ? i.length === 1
            ? jv.innerFrom(i[0])
            : wv.mergeAll(n)(Av.from(i, r))
          : Pv.EMPTY;
      }
      $t.merge = Ev;
      var Pi = {};
      (function (e) {
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.never = e.NEVER = void 0);
        var t = F,
          r = W;
        e.NEVER = new t.Observable(r.noop);
        function n() {
          return e.NEVER;
        }
        e.never = n;
      })(Pi);
      var jr = {},
        oe = {};
      Object.defineProperty(oe, '__esModule', { value: !0 }),
        (oe.argsOrArgArray = void 0);
      var Mv = Array.isArray;
      function Fv(e) {
        return e.length === 1 && Mv(e[0]) ? e[0] : e;
      }
      (oe.argsOrArgArray = Fv),
        Object.defineProperty(jr, '__esModule', { value: !0 }),
        (jr.onErrorResumeNext = void 0);
      var Tv = F,
        Iv = oe,
        Cv = $,
        Va = W,
        kv = w;
      function Rv() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        var r = Iv.argsOrArgArray(e);
        return new Tv.Observable(function (n) {
          var i = 0,
            a = function () {
              if (i < r.length) {
                var o = void 0;
                try {
                  o = kv.innerFrom(r[i++]);
                } catch {
                  a();
                  return;
                }
                var u = new Cv.OperatorSubscriber(n, void 0, Va.noop, Va.noop);
                o.subscribe(u), u.add(a);
              } else n.complete();
            };
          a();
        });
      }
      jr.onErrorResumeNext = Rv;
      var wt = {};
      Object.defineProperty(wt, '__esModule', { value: !0 }),
        (wt.pairs = void 0);
      var Wv = Y;
      function Lv(e, t) {
        return Wv.from(Object.entries(e), t);
      }
      wt.pairs = Lv;
      var jt = {},
        Pt = {};
      Object.defineProperty(Pt, '__esModule', { value: !0 }), (Pt.not = void 0);
      function Nv(e, t) {
        return function (r, n) {
          return !e.call(t, r, n);
        };
      }
      Pt.not = Nv;
      var ue = {};
      Object.defineProperty(ue, '__esModule', { value: !0 }),
        (ue.filter = void 0);
      var Uv = y,
        Vv = $;
      function qv(e, t) {
        return Uv.operate(function (r, n) {
          var i = 0;
          r.subscribe(
            Vv.createOperatorSubscriber(n, function (a) {
              return e.call(t, a, i++) && n.next(a);
            })
          );
        });
      }
      (ue.filter = qv),
        Object.defineProperty(jt, '__esModule', { value: !0 }),
        (jt.partition = void 0);
      var zv = Pt,
        qa = ue,
        za = w;
      function xv(e, t, r) {
        return [
          qa.filter(t, r)(za.innerFrom(e)),
          qa.filter(zv.not(t, r))(za.innerFrom(e)),
        ];
      }
      jt.partition = xv;
      var Ae = {};
      Object.defineProperty(Ae, '__esModule', { value: !0 }),
        (Ae.raceInit = Ae.race = void 0);
      var Bv = F,
        xa = w,
        Dv = oe,
        Yv = $;
      function Gv() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        return (
          (e = Dv.argsOrArgArray(e)),
          e.length === 1 ? xa.innerFrom(e[0]) : new Bv.Observable(Ba(e))
        );
      }
      Ae.race = Gv;
      function Ba(e) {
        return function (t) {
          for (
            var r = [],
              n = function (a) {
                r.push(
                  xa.innerFrom(e[a]).subscribe(
                    Yv.createOperatorSubscriber(t, function (o) {
                      if (r) {
                        for (var u = 0; u < r.length; u++)
                          u !== a && r[u].unsubscribe();
                        r = null;
                      }
                      t.next(o);
                    })
                  )
                );
              },
              i = 0;
            r && !t.closed && i < e.length;
            i++
          )
            n(i);
        };
      }
      Ae.raceInit = Ba;
      var At = {};
      Object.defineProperty(At, '__esModule', { value: !0 }),
        (At.range = void 0);
      var Kv = F,
        Qv = D;
      function Jv(e, t, r) {
        if ((t == null && ((t = e), (e = 0)), t <= 0)) return Qv.EMPTY;
        var n = t + e;
        return new Kv.Observable(
          r
            ? function (i) {
                var a = e;
                return r.schedule(function () {
                  a < n ? (i.next(a++), this.schedule()) : i.complete();
                });
              }
            : function (i) {
                for (var a = e; a < n && !i.closed; ) i.next(a++);
                i.complete();
              }
        );
      }
      At.range = Jv;
      var Et = {};
      Object.defineProperty(Et, '__esModule', { value: !0 }),
        (Et.using = void 0);
      var Xv = F,
        Zv = w,
        Hv = D;
      function ed(e, t) {
        return new Xv.Observable(function (r) {
          var n = e(),
            i = t(n),
            a = i ? Zv.innerFrom(i) : Hv.EMPTY;
          return (
            a.subscribe(r),
            function () {
              n && n.unsubscribe();
            }
          );
        });
      }
      Et.using = ed;
      var Ye = {},
        rd =
          (v && v.__read) ||
          function (e, t) {
            var r = typeof Symbol == 'function' && e[Symbol.iterator];
            if (!r) return e;
            var n = r.call(e),
              i,
              a = [],
              o;
            try {
              for (; (t === void 0 || t-- > 0) && !(i = n.next()).done; )
                a.push(i.value);
            } catch (u) {
              o = { error: u };
            } finally {
              try {
                i && !i.done && (r = n.return) && r.call(n);
              } finally {
                if (o) throw o.error;
              }
            }
            return a;
          },
        td =
          (v && v.__spreadArray) ||
          function (e, t) {
            for (var r = 0, n = t.length, i = e.length; r < n; r++, i++)
              e[i] = t[r];
            return e;
          };
      Object.defineProperty(Ye, '__esModule', { value: !0 }), (Ye.zip = void 0);
      var nd = F,
        id = w,
        ad = oe,
        od = D,
        ud = $,
        cd = C;
      function ld() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        var r = cd.popResultSelector(e),
          n = ad.argsOrArgArray(e);
        return n.length
          ? new nd.Observable(function (i) {
              var a = n.map(function () {
                  return [];
                }),
                o = n.map(function () {
                  return !1;
                });
              i.add(function () {
                a = o = null;
              });
              for (
                var u = function (c) {
                    id.innerFrom(n[c]).subscribe(
                      ud.createOperatorSubscriber(
                        i,
                        function (f) {
                          if (
                            (a[c].push(f),
                            a.every(function (d) {
                              return d.length;
                            }))
                          ) {
                            var s = a.map(function (d) {
                              return d.shift();
                            });
                            i.next(r ? r.apply(void 0, td([], rd(s))) : s),
                              a.some(function (d, p) {
                                return !d.length && o[p];
                              }) && i.complete();
                          }
                        },
                        function () {
                          (o[c] = !0), !a[c].length && i.complete();
                        }
                      )
                    );
                  },
                  l = 0;
                !i.closed && l < n.length;
                l++
              )
                u(l);
              return function () {
                a = o = null;
              };
            })
          : od.EMPTY;
      }
      Ye.zip = ld;
      var Da = {};
      Object.defineProperty(Da, '__esModule', { value: !0 });
      var Pr = {};
      Object.defineProperty(Pr, '__esModule', { value: !0 }),
        (Pr.audit = void 0);
      var fd = y,
        sd = w,
        Ya = $;
      function vd(e) {
        return fd.operate(function (t, r) {
          var n = !1,
            i = null,
            a = null,
            o = !1,
            u = function () {
              if ((a?.unsubscribe(), (a = null), n)) {
                n = !1;
                var c = i;
                (i = null), r.next(c);
              }
              o && r.complete();
            },
            l = function () {
              (a = null), o && r.complete();
            };
          t.subscribe(
            Ya.createOperatorSubscriber(
              r,
              function (c) {
                (n = !0),
                  (i = c),
                  a ||
                    sd
                      .innerFrom(e(c))
                      .subscribe((a = Ya.createOperatorSubscriber(r, u, l)));
              },
              function () {
                (o = !0), (!n || !a || a.closed) && r.complete();
              }
            )
          );
        });
      }
      Pr.audit = vd;
      var Mt = {};
      Object.defineProperty(Mt, '__esModule', { value: !0 }),
        (Mt.auditTime = void 0);
      var dd = q,
        bd = Pr,
        pd = re;
      function md(e, t) {
        return (
          t === void 0 && (t = dd.asyncScheduler),
          bd.audit(function () {
            return pd.timer(e, t);
          })
        );
      }
      Mt.auditTime = md;
      var Ft = {};
      Object.defineProperty(Ft, '__esModule', { value: !0 }),
        (Ft.buffer = void 0);
      var hd = y,
        yd = W,
        Ga = $,
        _d = w;
      function gd(e) {
        return hd.operate(function (t, r) {
          var n = [];
          return (
            t.subscribe(
              Ga.createOperatorSubscriber(
                r,
                function (i) {
                  return n.push(i);
                },
                function () {
                  r.next(n), r.complete();
                }
              )
            ),
            _d.innerFrom(e).subscribe(
              Ga.createOperatorSubscriber(
                r,
                function () {
                  var i = n;
                  (n = []), r.next(i);
                },
                yd.noop
              )
            ),
            function () {
              n = null;
            }
          );
        });
      }
      Ft.buffer = gd;
      var Tt = {},
        Ai =
          (v && v.__values) ||
          function (e) {
            var t = typeof Symbol == 'function' && Symbol.iterator,
              r = t && e[t],
              n = 0;
            if (r) return r.call(e);
            if (e && typeof e.length == 'number')
              return {
                next: function () {
                  return (
                    e && n >= e.length && (e = void 0),
                    { value: e && e[n++], done: !e }
                  );
                },
              };
            throw new TypeError(
              t ? 'Object is not iterable.' : 'Symbol.iterator is not defined.'
            );
          };
      Object.defineProperty(Tt, '__esModule', { value: !0 }),
        (Tt.bufferCount = void 0);
      var Od = y,
        Sd = $,
        $d = B;
      function wd(e, t) {
        return (
          t === void 0 && (t = null),
          (t = t ?? e),
          Od.operate(function (r, n) {
            var i = [],
              a = 0;
            r.subscribe(
              Sd.createOperatorSubscriber(
                n,
                function (o) {
                  var u,
                    l,
                    c,
                    f,
                    s = null;
                  a++ % t === 0 && i.push([]);
                  try {
                    for (var d = Ai(i), p = d.next(); !p.done; p = d.next()) {
                      var m = p.value;
                      m.push(o), e <= m.length && ((s = s ?? []), s.push(m));
                    }
                  } catch (g) {
                    u = { error: g };
                  } finally {
                    try {
                      p && !p.done && (l = d.return) && l.call(d);
                    } finally {
                      if (u) throw u.error;
                    }
                  }
                  if (s)
                    try {
                      for (var b = Ai(s), h = b.next(); !h.done; h = b.next()) {
                        var m = h.value;
                        $d.arrRemove(i, m), n.next(m);
                      }
                    } catch (g) {
                      c = { error: g };
                    } finally {
                      try {
                        h && !h.done && (f = b.return) && f.call(b);
                      } finally {
                        if (c) throw c.error;
                      }
                    }
                },
                function () {
                  var o, u;
                  try {
                    for (var l = Ai(i), c = l.next(); !c.done; c = l.next()) {
                      var f = c.value;
                      n.next(f);
                    }
                  } catch (s) {
                    o = { error: s };
                  } finally {
                    try {
                      c && !c.done && (u = l.return) && u.call(l);
                    } finally {
                      if (o) throw o.error;
                    }
                  }
                  n.complete();
                },
                void 0,
                function () {
                  i = null;
                }
              )
            );
          })
        );
      }
      Tt.bufferCount = wd;
      var It = {},
        jd =
          (v && v.__values) ||
          function (e) {
            var t = typeof Symbol == 'function' && Symbol.iterator,
              r = t && e[t],
              n = 0;
            if (r) return r.call(e);
            if (e && typeof e.length == 'number')
              return {
                next: function () {
                  return (
                    e && n >= e.length && (e = void 0),
                    { value: e && e[n++], done: !e }
                  );
                },
              };
            throw new TypeError(
              t ? 'Object is not iterable.' : 'Symbol.iterator is not defined.'
            );
          };
      Object.defineProperty(It, '__esModule', { value: !0 }),
        (It.bufferTime = void 0);
      var Pd = R,
        Ad = y,
        Ed = $,
        Md = B,
        Fd = q,
        Td = C,
        Ka = G;
      function Id(e) {
        for (var t, r, n = [], i = 1; i < arguments.length; i++)
          n[i - 1] = arguments[i];
        var a =
            (t = Td.popScheduler(n)) !== null && t !== void 0
              ? t
              : Fd.asyncScheduler,
          o = (r = n[0]) !== null && r !== void 0 ? r : null,
          u = n[1] || 1 / 0;
        return Ad.operate(function (l, c) {
          var f = [],
            s = !1,
            d = function (b) {
              var h = b.buffer,
                g = b.subs;
              g.unsubscribe(), Md.arrRemove(f, b), c.next(h), s && p();
            },
            p = function () {
              if (f) {
                var b = new Pd.Subscription();
                c.add(b);
                var h = [],
                  g = { buffer: h, subs: b };
                f.push(g),
                  Ka.executeSchedule(
                    b,
                    a,
                    function () {
                      return d(g);
                    },
                    e
                  );
              }
            };
          o !== null && o >= 0 ? Ka.executeSchedule(c, a, p, o, !0) : (s = !0),
            p();
          var m = Ed.createOperatorSubscriber(
            c,
            function (b) {
              var h,
                g,
                _ = f.slice();
              try {
                for (var O = jd(_), S = O.next(); !S.done; S = O.next()) {
                  var j = S.value,
                    A = j.buffer;
                  A.push(b), u <= A.length && d(j);
                }
              } catch (P) {
                h = { error: P };
              } finally {
                try {
                  S && !S.done && (g = O.return) && g.call(O);
                } finally {
                  if (h) throw h.error;
                }
              }
            },
            function () {
              for (; f?.length; ) c.next(f.shift().buffer);
              m?.unsubscribe(), c.complete(), c.unsubscribe();
            },
            void 0,
            function () {
              return (f = null);
            }
          );
          l.subscribe(m);
        });
      }
      It.bufferTime = Id;
      var Ct = {},
        Cd =
          (v && v.__values) ||
          function (e) {
            var t = typeof Symbol == 'function' && Symbol.iterator,
              r = t && e[t],
              n = 0;
            if (r) return r.call(e);
            if (e && typeof e.length == 'number')
              return {
                next: function () {
                  return (
                    e && n >= e.length && (e = void 0),
                    { value: e && e[n++], done: !e }
                  );
                },
              };
            throw new TypeError(
              t ? 'Object is not iterable.' : 'Symbol.iterator is not defined.'
            );
          };
      Object.defineProperty(Ct, '__esModule', { value: !0 }),
        (Ct.bufferToggle = void 0);
      var kd = R,
        Rd = y,
        Qa = w,
        Ei = $,
        Ja = W,
        Wd = B;
      function Ld(e, t) {
        return Rd.operate(function (r, n) {
          var i = [];
          Qa.innerFrom(e).subscribe(
            Ei.createOperatorSubscriber(
              n,
              function (a) {
                var o = [];
                i.push(o);
                var u = new kd.Subscription(),
                  l = function () {
                    Wd.arrRemove(i, o), n.next(o), u.unsubscribe();
                  };
                u.add(
                  Qa.innerFrom(t(a)).subscribe(
                    Ei.createOperatorSubscriber(n, l, Ja.noop)
                  )
                );
              },
              Ja.noop
            )
          ),
            r.subscribe(
              Ei.createOperatorSubscriber(
                n,
                function (a) {
                  var o, u;
                  try {
                    for (var l = Cd(i), c = l.next(); !c.done; c = l.next()) {
                      var f = c.value;
                      f.push(a);
                    }
                  } catch (s) {
                    o = { error: s };
                  } finally {
                    try {
                      c && !c.done && (u = l.return) && u.call(l);
                    } finally {
                      if (o) throw o.error;
                    }
                  }
                },
                function () {
                  for (; i.length > 0; ) n.next(i.shift());
                  n.complete();
                }
              )
            );
        });
      }
      Ct.bufferToggle = Ld;
      var kt = {};
      Object.defineProperty(kt, '__esModule', { value: !0 }),
        (kt.bufferWhen = void 0);
      var Nd = y,
        Ud = W,
        Xa = $,
        Vd = w;
      function qd(e) {
        return Nd.operate(function (t, r) {
          var n = null,
            i = null,
            a = function () {
              i?.unsubscribe();
              var o = n;
              (n = []),
                o && r.next(o),
                Vd.innerFrom(e()).subscribe(
                  (i = Xa.createOperatorSubscriber(r, a, Ud.noop))
                );
            };
          a(),
            t.subscribe(
              Xa.createOperatorSubscriber(
                r,
                function (o) {
                  return n?.push(o);
                },
                function () {
                  n && r.next(n), r.complete();
                },
                void 0,
                function () {
                  return (n = i = null);
                }
              )
            );
        });
      }
      kt.bufferWhen = qd;
      var Rt = {};
      Object.defineProperty(Rt, '__esModule', { value: !0 }),
        (Rt.catchError = void 0);
      var zd = w,
        xd = $,
        Bd = y;
      function Za(e) {
        return Bd.operate(function (t, r) {
          var n = null,
            i = !1,
            a;
          (n = t.subscribe(
            xd.createOperatorSubscriber(r, void 0, void 0, function (o) {
              (a = zd.innerFrom(e(o, Za(e)(t)))),
                n ? (n.unsubscribe(), (n = null), a.subscribe(r)) : (i = !0);
            })
          )),
            i && (n.unsubscribe(), (n = null), a.subscribe(r));
        });
      }
      Rt.catchError = Za;
      var Wt = {},
        Ar = {},
        Er = {},
        Mr = {},
        pe = {},
        Fr = {};
      Object.defineProperty(Fr, '__esModule', { value: !0 }),
        (Fr.scanInternals = void 0);
      var Dd = $;
      function Yd(e, t, r, n, i) {
        return function (a, o) {
          var u = r,
            l = t,
            c = 0;
          a.subscribe(
            Dd.createOperatorSubscriber(
              o,
              function (f) {
                var s = c++;
                (l = u ? e(l, f, s) : ((u = !0), f)), n && o.next(l);
              },
              i &&
                function () {
                  u && o.next(l), o.complete();
                }
            )
          );
        };
      }
      (Fr.scanInternals = Yd),
        Object.defineProperty(pe, '__esModule', { value: !0 }),
        (pe.reduce = void 0);
      var Gd = Fr,
        Kd = y;
      function Qd(e, t) {
        return Kd.operate(
          Gd.scanInternals(e, t, arguments.length >= 2, !1, !0)
        );
      }
      (pe.reduce = Qd),
        Object.defineProperty(Mr, '__esModule', { value: !0 }),
        (Mr.toArray = void 0);
      var Jd = pe,
        Xd = y,
        Zd = function (e, t) {
          return e.push(t), e;
        };
      function Hd() {
        return Xd.operate(function (e, t) {
          Jd.reduce(Zd, [])(e).subscribe(t);
        });
      }
      (Mr.toArray = Hd),
        Object.defineProperty(Er, '__esModule', { value: !0 }),
        (Er.joinAllInternals = void 0);
      var eb = L,
        rb = H,
        tb = ae,
        nb = K,
        ib = Mr;
      function ab(e, t) {
        return tb.pipe(
          ib.toArray(),
          nb.mergeMap(function (r) {
            return e(r);
          }),
          t ? rb.mapOneOrManyArgs(t) : eb.identity
        );
      }
      (Er.joinAllInternals = ab),
        Object.defineProperty(Ar, '__esModule', { value: !0 }),
        (Ar.combineLatestAll = void 0);
      var ob = be,
        ub = Er;
      function cb(e) {
        return ub.joinAllInternals(ob.combineLatest, e);
      }
      (Ar.combineLatestAll = cb),
        Object.defineProperty(Wt, '__esModule', { value: !0 }),
        (Wt.combineAll = void 0);
      var lb = Ar;
      Wt.combineAll = lb.combineLatestAll;
      var Lt = {},
        Nt = {},
        Ha =
          (v && v.__read) ||
          function (e, t) {
            var r = typeof Symbol == 'function' && e[Symbol.iterator];
            if (!r) return e;
            var n = r.call(e),
              i,
              a = [],
              o;
            try {
              for (; (t === void 0 || t-- > 0) && !(i = n.next()).done; )
                a.push(i.value);
            } catch (u) {
              o = { error: u };
            } finally {
              try {
                i && !i.done && (r = n.return) && r.call(n);
              } finally {
                if (o) throw o.error;
              }
            }
            return a;
          },
        eo =
          (v && v.__spreadArray) ||
          function (e, t) {
            for (var r = 0, n = t.length, i = e.length; r < n; r++, i++)
              e[i] = t[r];
            return e;
          };
      Object.defineProperty(Nt, '__esModule', { value: !0 }),
        (Nt.combineLatest = void 0);
      var fb = be,
        sb = y,
        vb = oe,
        db = H,
        bb = ae,
        pb = C;
      function ro() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        var r = pb.popResultSelector(e);
        return r
          ? bb.pipe(ro.apply(void 0, eo([], Ha(e))), db.mapOneOrManyArgs(r))
          : sb.operate(function (n, i) {
              fb.combineLatestInit(eo([n], Ha(vb.argsOrArgArray(e))))(i);
            });
      }
      Nt.combineLatest = ro;
      var mb =
          (v && v.__read) ||
          function (e, t) {
            var r = typeof Symbol == 'function' && e[Symbol.iterator];
            if (!r) return e;
            var n = r.call(e),
              i,
              a = [],
              o;
            try {
              for (; (t === void 0 || t-- > 0) && !(i = n.next()).done; )
                a.push(i.value);
            } catch (u) {
              o = { error: u };
            } finally {
              try {
                i && !i.done && (r = n.return) && r.call(n);
              } finally {
                if (o) throw o.error;
              }
            }
            return a;
          },
        hb =
          (v && v.__spreadArray) ||
          function (e, t) {
            for (var r = 0, n = t.length, i = e.length; r < n; r++, i++)
              e[i] = t[r];
            return e;
          };
      Object.defineProperty(Lt, '__esModule', { value: !0 }),
        (Lt.combineLatestWith = void 0);
      var yb = Nt;
      function _b() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        return yb.combineLatest.apply(void 0, hb([], mb(e)));
      }
      Lt.combineLatestWith = _b;
      var Tr = {};
      Object.defineProperty(Tr, '__esModule', { value: !0 }),
        (Tr.concatMap = void 0);
      var to = K,
        gb = E;
      function Ob(e, t) {
        return gb.isFunction(t) ? to.mergeMap(e, t, 1) : to.mergeMap(e, 1);
      }
      Tr.concatMap = Ob;
      var Ut = {};
      Object.defineProperty(Ut, '__esModule', { value: !0 }),
        (Ut.concatMapTo = void 0);
      var no = Tr,
        Sb = E;
      function $b(e, t) {
        return Sb.isFunction(t)
          ? no.concatMap(function () {
              return e;
            }, t)
          : no.concatMap(function () {
              return e;
            });
      }
      Ut.concatMapTo = $b;
      var Vt = {},
        qt = {},
        wb =
          (v && v.__read) ||
          function (e, t) {
            var r = typeof Symbol == 'function' && e[Symbol.iterator];
            if (!r) return e;
            var n = r.call(e),
              i,
              a = [],
              o;
            try {
              for (; (t === void 0 || t-- > 0) && !(i = n.next()).done; )
                a.push(i.value);
            } catch (u) {
              o = { error: u };
            } finally {
              try {
                i && !i.done && (r = n.return) && r.call(n);
              } finally {
                if (o) throw o.error;
              }
            }
            return a;
          },
        jb =
          (v && v.__spreadArray) ||
          function (e, t) {
            for (var r = 0, n = t.length, i = e.length; r < n; r++, i++)
              e[i] = t[r];
            return e;
          };
      Object.defineProperty(qt, '__esModule', { value: !0 }),
        (qt.concat = void 0);
      var Pb = y,
        Ab = Be,
        Eb = C,
        Mb = Y;
      function Fb() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        var r = Eb.popScheduler(e);
        return Pb.operate(function (n, i) {
          Ab.concatAll()(Mb.from(jb([n], wb(e)), r)).subscribe(i);
        });
      }
      qt.concat = Fb;
      var Tb =
          (v && v.__read) ||
          function (e, t) {
            var r = typeof Symbol == 'function' && e[Symbol.iterator];
            if (!r) return e;
            var n = r.call(e),
              i,
              a = [],
              o;
            try {
              for (; (t === void 0 || t-- > 0) && !(i = n.next()).done; )
                a.push(i.value);
            } catch (u) {
              o = { error: u };
            } finally {
              try {
                i && !i.done && (r = n.return) && r.call(n);
              } finally {
                if (o) throw o.error;
              }
            }
            return a;
          },
        Ib =
          (v && v.__spreadArray) ||
          function (e, t) {
            for (var r = 0, n = t.length, i = e.length; r < n; r++, i++)
              e[i] = t[r];
            return e;
          };
      Object.defineProperty(Vt, '__esModule', { value: !0 }),
        (Vt.concatWith = void 0);
      var Cb = qt;
      function kb() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        return Cb.concat.apply(void 0, Ib([], Tb(e)));
      }
      Vt.concatWith = kb;
      var Ge = {},
        zt = {};
      Object.defineProperty(zt, '__esModule', { value: !0 }),
        (zt.fromSubscribable = void 0);
      var Rb = F;
      function Wb(e) {
        return new Rb.Observable(function (t) {
          return e.subscribe(t);
        });
      }
      (zt.fromSubscribable = Wb),
        Object.defineProperty(Ge, '__esModule', { value: !0 }),
        (Ge.connect = void 0);
      var Lb = I,
        Nb = w,
        Ub = y,
        Vb = zt,
        qb = {
          connector: function () {
            return new Lb.Subject();
          },
        };
      function zb(e, t) {
        t === void 0 && (t = qb);
        var r = t.connector;
        return Ub.operate(function (n, i) {
          var a = r();
          Nb.innerFrom(e(Vb.fromSubscribable(a))).subscribe(i),
            i.add(n.subscribe(a));
        });
      }
      Ge.connect = zb;
      var xt = {};
      Object.defineProperty(xt, '__esModule', { value: !0 }),
        (xt.count = void 0);
      var xb = pe;
      function Bb(e) {
        return xb.reduce(function (t, r, n) {
          return !e || e(r, n) ? t + 1 : t;
        }, 0);
      }
      xt.count = Bb;
      var Bt = {};
      Object.defineProperty(Bt, '__esModule', { value: !0 }),
        (Bt.debounce = void 0);
      var Db = y,
        Yb = W,
        io = $,
        Gb = w;
      function Kb(e) {
        return Db.operate(function (t, r) {
          var n = !1,
            i = null,
            a = null,
            o = function () {
              if ((a?.unsubscribe(), (a = null), n)) {
                n = !1;
                var u = i;
                (i = null), r.next(u);
              }
            };
          t.subscribe(
            io.createOperatorSubscriber(
              r,
              function (u) {
                a?.unsubscribe(),
                  (n = !0),
                  (i = u),
                  (a = io.createOperatorSubscriber(r, o, Yb.noop)),
                  Gb.innerFrom(e(u)).subscribe(a);
              },
              function () {
                o(), r.complete();
              },
              void 0,
              function () {
                i = a = null;
              }
            )
          );
        });
      }
      Bt.debounce = Kb;
      var Dt = {};
      Object.defineProperty(Dt, '__esModule', { value: !0 }),
        (Dt.debounceTime = void 0);
      var Qb = q,
        Jb = y,
        Xb = $;
      function Zb(e, t) {
        return (
          t === void 0 && (t = Qb.asyncScheduler),
          Jb.operate(function (r, n) {
            var i = null,
              a = null,
              o = null,
              u = function () {
                if (i) {
                  i.unsubscribe(), (i = null);
                  var c = a;
                  (a = null), n.next(c);
                }
              };
            function l() {
              var c = o + e,
                f = t.now();
              if (f < c) {
                (i = this.schedule(void 0, c - f)), n.add(i);
                return;
              }
              u();
            }
            r.subscribe(
              Xb.createOperatorSubscriber(
                n,
                function (c) {
                  (a = c),
                    (o = t.now()),
                    i || ((i = t.schedule(l, e)), n.add(i));
                },
                function () {
                  u(), n.complete();
                },
                void 0,
                function () {
                  a = i = null;
                }
              )
            );
          })
        );
      }
      Dt.debounceTime = Zb;
      var Ee = {};
      Object.defineProperty(Ee, '__esModule', { value: !0 }),
        (Ee.defaultIfEmpty = void 0);
      var Hb = y,
        ep = $;
      function rp(e) {
        return Hb.operate(function (t, r) {
          var n = !1;
          t.subscribe(
            ep.createOperatorSubscriber(
              r,
              function (i) {
                (n = !0), r.next(i);
              },
              function () {
                n || r.next(e), r.complete();
              }
            )
          );
        });
      }
      Ee.defaultIfEmpty = rp;
      var Yt = {},
        Ir = {},
        Me = {};
      Object.defineProperty(Me, '__esModule', { value: !0 }),
        (Me.take = void 0);
      var tp = D,
        np = y,
        ip = $;
      function ap(e) {
        return e <= 0
          ? function () {
              return tp.EMPTY;
            }
          : np.operate(function (t, r) {
              var n = 0;
              t.subscribe(
                ip.createOperatorSubscriber(r, function (i) {
                  ++n <= e && (r.next(i), e <= n && r.complete());
                })
              );
            });
      }
      Me.take = ap;
      var Cr = {};
      Object.defineProperty(Cr, '__esModule', { value: !0 }),
        (Cr.ignoreElements = void 0);
      var op = y,
        up = $,
        cp = W;
      function lp() {
        return op.operate(function (e, t) {
          e.subscribe(up.createOperatorSubscriber(t, cp.noop));
        });
      }
      Cr.ignoreElements = lp;
      var kr = {};
      Object.defineProperty(kr, '__esModule', { value: !0 }),
        (kr.mapTo = void 0);
      var fp = ee;
      function sp(e) {
        return fp.map(function () {
          return e;
        });
      }
      (kr.mapTo = sp),
        Object.defineProperty(Ir, '__esModule', { value: !0 }),
        (Ir.delayWhen = void 0);
      var vp = $e,
        ao = Me,
        dp = Cr,
        bp = kr,
        pp = K,
        mp = w;
      function oo(e, t) {
        return t
          ? function (r) {
              return vp.concat(
                t.pipe(ao.take(1), dp.ignoreElements()),
                r.pipe(oo(e))
              );
            }
          : pp.mergeMap(function (r, n) {
              return mp.innerFrom(e(r, n)).pipe(ao.take(1), bp.mapTo(r));
            });
      }
      (Ir.delayWhen = oo),
        Object.defineProperty(Yt, '__esModule', { value: !0 }),
        (Yt.delay = void 0);
      var hp = q,
        yp = Ir,
        _p = re;
      function gp(e, t) {
        t === void 0 && (t = hp.asyncScheduler);
        var r = _p.timer(e, t);
        return yp.delayWhen(function () {
          return r;
        });
      }
      Yt.delay = gp;
      var Gt = {};
      Object.defineProperty(Gt, '__esModule', { value: !0 }),
        (Gt.dematerialize = void 0);
      var Op = ot,
        Sp = y,
        $p = $;
      function wp() {
        return Sp.operate(function (e, t) {
          e.subscribe(
            $p.createOperatorSubscriber(t, function (r) {
              return Op.observeNotification(r, t);
            })
          );
        });
      }
      Gt.dematerialize = wp;
      var Kt = {};
      Object.defineProperty(Kt, '__esModule', { value: !0 }),
        (Kt.distinct = void 0);
      var jp = y,
        uo = $,
        Pp = W,
        Ap = w;
      function Ep(e, t) {
        return jp.operate(function (r, n) {
          var i = new Set();
          r.subscribe(
            uo.createOperatorSubscriber(n, function (a) {
              var o = e ? e(a) : a;
              i.has(o) || (i.add(o), n.next(a));
            })
          ),
            t &&
              Ap.innerFrom(t).subscribe(
                uo.createOperatorSubscriber(
                  n,
                  function () {
                    return i.clear();
                  },
                  Pp.noop
                )
              );
        });
      }
      Kt.distinct = Ep;
      var Rr = {};
      Object.defineProperty(Rr, '__esModule', { value: !0 }),
        (Rr.distinctUntilChanged = void 0);
      var Mp = L,
        Fp = y,
        Tp = $;
      function Ip(e, t) {
        return (
          t === void 0 && (t = Mp.identity),
          (e = e ?? Cp),
          Fp.operate(function (r, n) {
            var i,
              a = !0;
            r.subscribe(
              Tp.createOperatorSubscriber(n, function (o) {
                var u = t(o);
                (a || !e(i, u)) && ((a = !1), (i = u), n.next(o));
              })
            );
          })
        );
      }
      Rr.distinctUntilChanged = Ip;
      function Cp(e, t) {
        return e === t;
      }
      var Qt = {};
      Object.defineProperty(Qt, '__esModule', { value: !0 }),
        (Qt.distinctUntilKeyChanged = void 0);
      var kp = Rr;
      function Rp(e, t) {
        return kp.distinctUntilChanged(function (r, n) {
          return t ? t(r[e], n[e]) : r[e] === n[e];
        });
      }
      Qt.distinctUntilKeyChanged = Rp;
      var Jt = {},
        Fe = {};
      Object.defineProperty(Fe, '__esModule', { value: !0 }),
        (Fe.throwIfEmpty = void 0);
      var Wp = Z,
        Lp = y,
        Np = $;
      function Up(e) {
        return (
          e === void 0 && (e = Vp),
          Lp.operate(function (t, r) {
            var n = !1;
            t.subscribe(
              Np.createOperatorSubscriber(
                r,
                function (i) {
                  (n = !0), r.next(i);
                },
                function () {
                  return n ? r.complete() : r.error(e());
                }
              )
            );
          })
        );
      }
      Fe.throwIfEmpty = Up;
      function Vp() {
        return new Wp.EmptyError();
      }
      Object.defineProperty(Jt, '__esModule', { value: !0 }),
        (Jt.elementAt = void 0);
      var co = yr,
        qp = ue,
        zp = Fe,
        xp = Ee,
        Bp = Me;
      function Dp(e, t) {
        if (e < 0) throw new co.ArgumentOutOfRangeError();
        var r = arguments.length >= 2;
        return function (n) {
          return n.pipe(
            qp.filter(function (i, a) {
              return a === e;
            }),
            Bp.take(1),
            r
              ? xp.defaultIfEmpty(t)
              : zp.throwIfEmpty(function () {
                  return new co.ArgumentOutOfRangeError();
                })
          );
        };
      }
      Jt.elementAt = Dp;
      var Xt = {},
        Yp =
          (v && v.__read) ||
          function (e, t) {
            var r = typeof Symbol == 'function' && e[Symbol.iterator];
            if (!r) return e;
            var n = r.call(e),
              i,
              a = [],
              o;
            try {
              for (; (t === void 0 || t-- > 0) && !(i = n.next()).done; )
                a.push(i.value);
            } catch (u) {
              o = { error: u };
            } finally {
              try {
                i && !i.done && (r = n.return) && r.call(n);
              } finally {
                if (o) throw o.error;
              }
            }
            return a;
          },
        Gp =
          (v && v.__spreadArray) ||
          function (e, t) {
            for (var r = 0, n = t.length, i = e.length; r < n; r++, i++)
              e[i] = t[r];
            return e;
          };
      Object.defineProperty(Xt, '__esModule', { value: !0 }),
        (Xt.endWith = void 0);
      var Kp = $e,
        Qp = Ue;
      function Jp() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        return function (r) {
          return Kp.concat(r, Qp.of.apply(void 0, Gp([], Yp(e))));
        };
      }
      Xt.endWith = Jp;
      var Zt = {};
      Object.defineProperty(Zt, '__esModule', { value: !0 }),
        (Zt.every = void 0);
      var Xp = y,
        Zp = $;
      function Hp(e, t) {
        return Xp.operate(function (r, n) {
          var i = 0;
          r.subscribe(
            Zp.createOperatorSubscriber(
              n,
              function (a) {
                e.call(t, a, i++, r) || (n.next(!1), n.complete());
              },
              function () {
                n.next(!0), n.complete();
              }
            )
          );
        });
      }
      Zt.every = Hp;
      var Ht = {},
        Wr = {},
        Lr = {};
      Object.defineProperty(Lr, '__esModule', { value: !0 }),
        (Lr.exhaustMap = void 0);
      var em = ee,
        lo = w,
        rm = y,
        fo = $;
      function so(e, t) {
        return t
          ? function (r) {
              return r.pipe(
                so(function (n, i) {
                  return lo.innerFrom(e(n, i)).pipe(
                    em.map(function (a, o) {
                      return t(n, a, i, o);
                    })
                  );
                })
              );
            }
          : rm.operate(function (r, n) {
              var i = 0,
                a = null,
                o = !1;
              r.subscribe(
                fo.createOperatorSubscriber(
                  n,
                  function (u) {
                    a ||
                      ((a = fo.createOperatorSubscriber(n, void 0, function () {
                        (a = null), o && n.complete();
                      })),
                      lo.innerFrom(e(u, i++)).subscribe(a));
                  },
                  function () {
                    (o = !0), !a && n.complete();
                  }
                )
              );
            });
      }
      (Lr.exhaustMap = so),
        Object.defineProperty(Wr, '__esModule', { value: !0 }),
        (Wr.exhaustAll = void 0);
      var tm = Lr,
        nm = L;
      function im() {
        return tm.exhaustMap(nm.identity);
      }
      (Wr.exhaustAll = im),
        Object.defineProperty(Ht, '__esModule', { value: !0 }),
        (Ht.exhaust = void 0);
      var am = Wr;
      Ht.exhaust = am.exhaustAll;
      var en = {};
      Object.defineProperty(en, '__esModule', { value: !0 }),
        (en.expand = void 0);
      var om = y,
        um = De;
      function cm(e, t, r) {
        return (
          t === void 0 && (t = 1 / 0),
          (t = (t || 0) < 1 ? 1 / 0 : t),
          om.operate(function (n, i) {
            return um.mergeInternals(n, i, e, t, void 0, !0, r);
          })
        );
      }
      en.expand = cm;
      var rn = {};
      Object.defineProperty(rn, '__esModule', { value: !0 }),
        (rn.finalize = void 0);
      var lm = y;
      function fm(e) {
        return lm.operate(function (t, r) {
          try {
            t.subscribe(r);
          } finally {
            r.add(e);
          }
        });
      }
      rn.finalize = fm;
      var Te = {};
      Object.defineProperty(Te, '__esModule', { value: !0 }),
        (Te.createFind = Te.find = void 0);
      var sm = y,
        vm = $;
      function dm(e, t) {
        return sm.operate(vo(e, t, 'value'));
      }
      Te.find = dm;
      function vo(e, t, r) {
        var n = r === 'index';
        return function (i, a) {
          var o = 0;
          i.subscribe(
            vm.createOperatorSubscriber(
              a,
              function (u) {
                var l = o++;
                e.call(t, u, l, i) && (a.next(n ? l : u), a.complete());
              },
              function () {
                a.next(n ? -1 : void 0), a.complete();
              }
            )
          );
        };
      }
      Te.createFind = vo;
      var tn = {};
      Object.defineProperty(tn, '__esModule', { value: !0 }),
        (tn.findIndex = void 0);
      var bm = y,
        pm = Te;
      function mm(e, t) {
        return bm.operate(pm.createFind(e, t, 'index'));
      }
      tn.findIndex = mm;
      var nn = {};
      Object.defineProperty(nn, '__esModule', { value: !0 }),
        (nn.first = void 0);
      var hm = Z,
        ym = ue,
        _m = Me,
        gm = Ee,
        Om = Fe,
        Sm = L;
      function $m(e, t) {
        var r = arguments.length >= 2;
        return function (n) {
          return n.pipe(
            e
              ? ym.filter(function (i, a) {
                  return e(i, a, n);
                })
              : Sm.identity,
            _m.take(1),
            r
              ? gm.defaultIfEmpty(t)
              : Om.throwIfEmpty(function () {
                  return new hm.EmptyError();
                })
          );
        };
      }
      nn.first = $m;
      var an = {};
      Object.defineProperty(an, '__esModule', { value: !0 }),
        (an.groupBy = void 0);
      var wm = F,
        jm = w,
        Pm = I,
        Am = y,
        bo = $;
      function Em(e, t, r, n) {
        return Am.operate(function (i, a) {
          var o;
          !t || typeof t == 'function'
            ? (o = t)
            : ((r = t.duration), (o = t.element), (n = t.connector));
          var u = new Map(),
            l = function (m) {
              u.forEach(m), m(a);
            },
            c = function (m) {
              return l(function (b) {
                return b.error(m);
              });
            },
            f = 0,
            s = !1,
            d = new bo.OperatorSubscriber(
              a,
              function (m) {
                try {
                  var b = e(m),
                    h = u.get(b);
                  if (!h) {
                    u.set(b, (h = n ? n() : new Pm.Subject()));
                    var g = p(b, h);
                    if ((a.next(g), r)) {
                      var _ = bo.createOperatorSubscriber(
                        h,
                        function () {
                          h.complete(), _?.unsubscribe();
                        },
                        void 0,
                        void 0,
                        function () {
                          return u.delete(b);
                        }
                      );
                      d.add(jm.innerFrom(r(g)).subscribe(_));
                    }
                  }
                  h.next(o ? o(m) : m);
                } catch (O) {
                  c(O);
                }
              },
              function () {
                return l(function (m) {
                  return m.complete();
                });
              },
              c,
              function () {
                return u.clear();
              },
              function () {
                return (s = !0), f === 0;
              }
            );
          i.subscribe(d);
          function p(m, b) {
            var h = new wm.Observable(function (g) {
              f++;
              var _ = b.subscribe(g);
              return function () {
                _.unsubscribe(), --f === 0 && s && d.unsubscribe();
              };
            });
            return (h.key = m), h;
          }
        });
      }
      an.groupBy = Em;
      var on = {};
      Object.defineProperty(on, '__esModule', { value: !0 }),
        (on.isEmpty = void 0);
      var Mm = y,
        Fm = $;
      function Tm() {
        return Mm.operate(function (e, t) {
          e.subscribe(
            Fm.createOperatorSubscriber(
              t,
              function () {
                t.next(!1), t.complete();
              },
              function () {
                t.next(!0), t.complete();
              }
            )
          );
        });
      }
      on.isEmpty = Tm;
      var un = {},
        Nr = {},
        Im =
          (v && v.__values) ||
          function (e) {
            var t = typeof Symbol == 'function' && Symbol.iterator,
              r = t && e[t],
              n = 0;
            if (r) return r.call(e);
            if (e && typeof e.length == 'number')
              return {
                next: function () {
                  return (
                    e && n >= e.length && (e = void 0),
                    { value: e && e[n++], done: !e }
                  );
                },
              };
            throw new TypeError(
              t ? 'Object is not iterable.' : 'Symbol.iterator is not defined.'
            );
          };
      Object.defineProperty(Nr, '__esModule', { value: !0 }),
        (Nr.takeLast = void 0);
      var Cm = D,
        km = y,
        Rm = $;
      function Wm(e) {
        return e <= 0
          ? function () {
              return Cm.EMPTY;
            }
          : km.operate(function (t, r) {
              var n = [];
              t.subscribe(
                Rm.createOperatorSubscriber(
                  r,
                  function (i) {
                    n.push(i), e < n.length && n.shift();
                  },
                  function () {
                    var i, a;
                    try {
                      for (var o = Im(n), u = o.next(); !u.done; u = o.next()) {
                        var l = u.value;
                        r.next(l);
                      }
                    } catch (c) {
                      i = { error: c };
                    } finally {
                      try {
                        u && !u.done && (a = o.return) && a.call(o);
                      } finally {
                        if (i) throw i.error;
                      }
                    }
                    r.complete();
                  },
                  void 0,
                  function () {
                    n = null;
                  }
                )
              );
            });
      }
      (Nr.takeLast = Wm),
        Object.defineProperty(un, '__esModule', { value: !0 }),
        (un.last = void 0);
      var Lm = Z,
        Nm = ue,
        Um = Nr,
        Vm = Fe,
        qm = Ee,
        zm = L;
      function xm(e, t) {
        var r = arguments.length >= 2;
        return function (n) {
          return n.pipe(
            e
              ? Nm.filter(function (i, a) {
                  return e(i, a, n);
                })
              : zm.identity,
            Um.takeLast(1),
            r
              ? qm.defaultIfEmpty(t)
              : Vm.throwIfEmpty(function () {
                  return new Lm.EmptyError();
                })
          );
        };
      }
      un.last = xm;
      var cn = {};
      Object.defineProperty(cn, '__esModule', { value: !0 }),
        (cn.materialize = void 0);
      var Mi = ot,
        Bm = y,
        Dm = $;
      function Ym() {
        return Bm.operate(function (e, t) {
          e.subscribe(
            Dm.createOperatorSubscriber(
              t,
              function (r) {
                t.next(Mi.Notification.createNext(r));
              },
              function () {
                t.next(Mi.Notification.createComplete()), t.complete();
              },
              function (r) {
                t.next(Mi.Notification.createError(r)), t.complete();
              }
            )
          );
        });
      }
      cn.materialize = Ym;
      var ln = {};
      Object.defineProperty(ln, '__esModule', { value: !0 }), (ln.max = void 0);
      var Gm = pe,
        Km = E;
      function Qm(e) {
        return Gm.reduce(
          Km.isFunction(e)
            ? function (t, r) {
                return e(t, r) > 0 ? t : r;
              }
            : function (t, r) {
                return t > r ? t : r;
              }
        );
      }
      ln.max = Qm;
      var fn = {};
      Object.defineProperty(fn, '__esModule', { value: !0 }),
        (fn.flatMap = void 0);
      var Jm = K;
      fn.flatMap = Jm.mergeMap;
      var sn = {};
      Object.defineProperty(sn, '__esModule', { value: !0 }),
        (sn.mergeMapTo = void 0);
      var po = K,
        Xm = E;
      function Zm(e, t, r) {
        return (
          r === void 0 && (r = 1 / 0),
          Xm.isFunction(t)
            ? po.mergeMap(
                function () {
                  return e;
                },
                t,
                r
              )
            : (typeof t == 'number' && (r = t),
              po.mergeMap(function () {
                return e;
              }, r))
        );
      }
      sn.mergeMapTo = Zm;
      var vn = {};
      Object.defineProperty(vn, '__esModule', { value: !0 }),
        (vn.mergeScan = void 0);
      var Hm = y,
        eh = De;
      function rh(e, t, r) {
        return (
          r === void 0 && (r = 1 / 0),
          Hm.operate(function (n, i) {
            var a = t;
            return eh.mergeInternals(
              n,
              i,
              function (o, u) {
                return e(a, o, u);
              },
              r,
              function (o) {
                a = o;
              },
              !1,
              void 0,
              function () {
                return (a = null);
              }
            );
          })
        );
      }
      vn.mergeScan = rh;
      var dn = {},
        bn = {},
        th =
          (v && v.__read) ||
          function (e, t) {
            var r = typeof Symbol == 'function' && e[Symbol.iterator];
            if (!r) return e;
            var n = r.call(e),
              i,
              a = [],
              o;
            try {
              for (; (t === void 0 || t-- > 0) && !(i = n.next()).done; )
                a.push(i.value);
            } catch (u) {
              o = { error: u };
            } finally {
              try {
                i && !i.done && (r = n.return) && r.call(n);
              } finally {
                if (o) throw o.error;
              }
            }
            return a;
          },
        nh =
          (v && v.__spreadArray) ||
          function (e, t) {
            for (var r = 0, n = t.length, i = e.length; r < n; r++, i++)
              e[i] = t[r];
            return e;
          };
      Object.defineProperty(bn, '__esModule', { value: !0 }),
        (bn.merge = void 0);
      var ih = y,
        ah = oe,
        oh = we,
        mo = C,
        uh = Y;
      function ch() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        var r = mo.popScheduler(e),
          n = mo.popNumber(e, 1 / 0);
        return (
          (e = ah.argsOrArgArray(e)),
          ih.operate(function (i, a) {
            oh.mergeAll(n)(uh.from(nh([i], th(e)), r)).subscribe(a);
          })
        );
      }
      bn.merge = ch;
      var lh =
          (v && v.__read) ||
          function (e, t) {
            var r = typeof Symbol == 'function' && e[Symbol.iterator];
            if (!r) return e;
            var n = r.call(e),
              i,
              a = [],
              o;
            try {
              for (; (t === void 0 || t-- > 0) && !(i = n.next()).done; )
                a.push(i.value);
            } catch (u) {
              o = { error: u };
            } finally {
              try {
                i && !i.done && (r = n.return) && r.call(n);
              } finally {
                if (o) throw o.error;
              }
            }
            return a;
          },
        fh =
          (v && v.__spreadArray) ||
          function (e, t) {
            for (var r = 0, n = t.length, i = e.length; r < n; r++, i++)
              e[i] = t[r];
            return e;
          };
      Object.defineProperty(dn, '__esModule', { value: !0 }),
        (dn.mergeWith = void 0);
      var sh = bn;
      function vh() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        return sh.merge.apply(void 0, fh([], lh(e)));
      }
      dn.mergeWith = vh;
      var pn = {};
      Object.defineProperty(pn, '__esModule', { value: !0 }), (pn.min = void 0);
      var dh = pe,
        bh = E;
      function ph(e) {
        return dh.reduce(
          bh.isFunction(e)
            ? function (t, r) {
                return e(t, r) < 0 ? t : r;
              }
            : function (t, r) {
                return t < r ? t : r;
              }
        );
      }
      pn.min = ph;
      var Ke = {};
      Object.defineProperty(Ke, '__esModule', { value: !0 }),
        (Ke.multicast = void 0);
      var mh = ye,
        ho = E,
        hh = Ge;
      function yh(e, t) {
        var r = ho.isFunction(e)
          ? e
          : function () {
              return e;
            };
        return ho.isFunction(t)
          ? hh.connect(t, { connector: r })
          : function (n) {
              return new mh.ConnectableObservable(n, r);
            };
      }
      Ke.multicast = yh;
      var Qe = {},
        _h =
          (v && v.__read) ||
          function (e, t) {
            var r = typeof Symbol == 'function' && e[Symbol.iterator];
            if (!r) return e;
            var n = r.call(e),
              i,
              a = [],
              o;
            try {
              for (; (t === void 0 || t-- > 0) && !(i = n.next()).done; )
                a.push(i.value);
            } catch (u) {
              o = { error: u };
            } finally {
              try {
                i && !i.done && (r = n.return) && r.call(n);
              } finally {
                if (o) throw o.error;
              }
            }
            return a;
          },
        gh =
          (v && v.__spreadArray) ||
          function (e, t) {
            for (var r = 0, n = t.length, i = e.length; r < n; r++, i++)
              e[i] = t[r];
            return e;
          };
      Object.defineProperty(Qe, '__esModule', { value: !0 }),
        (Qe.onErrorResumeNext = Qe.onErrorResumeNextWith = void 0);
      var Oh = oe,
        Sh = jr;
      function yo() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        var r = Oh.argsOrArgArray(e);
        return function (n) {
          return Sh.onErrorResumeNext.apply(void 0, gh([n], _h(r)));
        };
      }
      (Qe.onErrorResumeNextWith = yo), (Qe.onErrorResumeNext = yo);
      var mn = {};
      Object.defineProperty(mn, '__esModule', { value: !0 }),
        (mn.pairwise = void 0);
      var $h = y,
        wh = $;
      function jh() {
        return $h.operate(function (e, t) {
          var r,
            n = !1;
          e.subscribe(
            wh.createOperatorSubscriber(t, function (i) {
              var a = r;
              (r = i), n && t.next([a, i]), (n = !0);
            })
          );
        });
      }
      mn.pairwise = jh;
      var hn = {};
      Object.defineProperty(hn, '__esModule', { value: !0 }),
        (hn.pluck = void 0);
      var Ph = ee;
      function Ah() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        var r = e.length;
        if (r === 0) throw new Error('list of properties cannot be empty.');
        return Ph.map(function (n) {
          for (var i = n, a = 0; a < r; a++) {
            var o = i?.[e[a]];
            if (typeof o < 'u') i = o;
            else return;
          }
          return i;
        });
      }
      hn.pluck = Ah;
      var yn = {};
      Object.defineProperty(yn, '__esModule', { value: !0 }),
        (yn.publish = void 0);
      var Eh = I,
        Mh = Ke,
        Fh = Ge;
      function Th(e) {
        return e
          ? function (t) {
              return Fh.connect(e)(t);
            }
          : function (t) {
              return Mh.multicast(new Eh.Subject())(t);
            };
      }
      yn.publish = Th;
      var _n = {};
      Object.defineProperty(_n, '__esModule', { value: !0 }),
        (_n.publishBehavior = void 0);
      var Ih = ur,
        Ch = ye;
      function kh(e) {
        return function (t) {
          var r = new Ih.BehaviorSubject(e);
          return new Ch.ConnectableObservable(t, function () {
            return r;
          });
        };
      }
      _n.publishBehavior = kh;
      var gn = {};
      Object.defineProperty(gn, '__esModule', { value: !0 }),
        (gn.publishLast = void 0);
      var Rh = We,
        Wh = ye;
      function Lh() {
        return function (e) {
          var t = new Rh.AsyncSubject();
          return new Wh.ConnectableObservable(e, function () {
            return t;
          });
        };
      }
      gn.publishLast = Lh;
      var On = {};
      Object.defineProperty(On, '__esModule', { value: !0 }),
        (On.publishReplay = void 0);
      var Nh = Re,
        Uh = Ke,
        _o = E;
      function Vh(e, t, r, n) {
        r && !_o.isFunction(r) && (n = r);
        var i = _o.isFunction(r) ? r : void 0;
        return function (a) {
          return Uh.multicast(new Nh.ReplaySubject(e, t, n), i)(a);
        };
      }
      On.publishReplay = Vh;
      var Sn = {},
        qh =
          (v && v.__read) ||
          function (e, t) {
            var r = typeof Symbol == 'function' && e[Symbol.iterator];
            if (!r) return e;
            var n = r.call(e),
              i,
              a = [],
              o;
            try {
              for (; (t === void 0 || t-- > 0) && !(i = n.next()).done; )
                a.push(i.value);
            } catch (u) {
              o = { error: u };
            } finally {
              try {
                i && !i.done && (r = n.return) && r.call(n);
              } finally {
                if (o) throw o.error;
              }
            }
            return a;
          },
        zh =
          (v && v.__spreadArray) ||
          function (e, t) {
            for (var r = 0, n = t.length, i = e.length; r < n; r++, i++)
              e[i] = t[r];
            return e;
          };
      Object.defineProperty(Sn, '__esModule', { value: !0 }),
        (Sn.raceWith = void 0);
      var xh = Ae,
        Bh = y,
        Dh = L;
      function Yh() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        return e.length
          ? Bh.operate(function (r, n) {
              xh.raceInit(zh([r], qh(e)))(n);
            })
          : Dh.identity;
      }
      Sn.raceWith = Yh;
      var $n = {};
      Object.defineProperty($n, '__esModule', { value: !0 }),
        ($n.repeat = void 0);
      var Gh = D,
        Kh = y,
        go = $,
        Qh = w,
        Jh = re;
      function Xh(e) {
        var t,
          r = 1 / 0,
          n;
        return (
          e != null &&
            (typeof e == 'object'
              ? ((t = e.count), (r = t === void 0 ? 1 / 0 : t), (n = e.delay))
              : (r = e)),
          r <= 0
            ? function () {
                return Gh.EMPTY;
              }
            : Kh.operate(function (i, a) {
                var o = 0,
                  u,
                  l = function () {
                    if ((u?.unsubscribe(), (u = null), n != null)) {
                      var f =
                          typeof n == 'number'
                            ? Jh.timer(n)
                            : Qh.innerFrom(n(o)),
                        s = go.createOperatorSubscriber(a, function () {
                          s.unsubscribe(), c();
                        });
                      f.subscribe(s);
                    } else c();
                  },
                  c = function () {
                    var f = !1;
                    (u = i.subscribe(
                      go.createOperatorSubscriber(a, void 0, function () {
                        ++o < r ? (u ? l() : (f = !0)) : a.complete();
                      })
                    )),
                      f && l();
                  };
                c();
              })
        );
      }
      $n.repeat = Xh;
      var wn = {};
      Object.defineProperty(wn, '__esModule', { value: !0 }),
        (wn.repeatWhen = void 0);
      var Zh = w,
        Hh = I,
        ey = y,
        Oo = $;
      function ry(e) {
        return ey.operate(function (t, r) {
          var n,
            i = !1,
            a,
            o = !1,
            u = !1,
            l = function () {
              return u && o && (r.complete(), !0);
            },
            c = function () {
              return (
                a ||
                  ((a = new Hh.Subject()),
                  Zh.innerFrom(e(a)).subscribe(
                    Oo.createOperatorSubscriber(
                      r,
                      function () {
                        n ? f() : (i = !0);
                      },
                      function () {
                        (o = !0), l();
                      }
                    )
                  )),
                a
              );
            },
            f = function () {
              (u = !1),
                (n = t.subscribe(
                  Oo.createOperatorSubscriber(r, void 0, function () {
                    (u = !0), !l() && c().next();
                  })
                )),
                i && (n.unsubscribe(), (n = null), (i = !1), f());
            };
          f();
        });
      }
      wn.repeatWhen = ry;
      var jn = {};
      Object.defineProperty(jn, '__esModule', { value: !0 }),
        (jn.retry = void 0);
      var ty = y,
        So = $,
        ny = L,
        iy = re,
        ay = w;
      function oy(e) {
        e === void 0 && (e = 1 / 0);
        var t;
        e && typeof e == 'object' ? (t = e) : (t = { count: e });
        var r = t.count,
          n = r === void 0 ? 1 / 0 : r,
          i = t.delay,
          a = t.resetOnSuccess,
          o = a === void 0 ? !1 : a;
        return n <= 0
          ? ny.identity
          : ty.operate(function (u, l) {
              var c = 0,
                f,
                s = function () {
                  var d = !1;
                  (f = u.subscribe(
                    So.createOperatorSubscriber(
                      l,
                      function (p) {
                        o && (c = 0), l.next(p);
                      },
                      void 0,
                      function (p) {
                        if (c++ < n) {
                          var m = function () {
                            f ? (f.unsubscribe(), (f = null), s()) : (d = !0);
                          };
                          if (i != null) {
                            var b =
                                typeof i == 'number'
                                  ? iy.timer(i)
                                  : ay.innerFrom(i(p, c)),
                              h = So.createOperatorSubscriber(
                                l,
                                function () {
                                  h.unsubscribe(), m();
                                },
                                function () {
                                  l.complete();
                                }
                              );
                            b.subscribe(h);
                          } else m();
                        } else l.error(p);
                      }
                    )
                  )),
                    d && (f.unsubscribe(), (f = null), s());
                };
              s();
            });
      }
      jn.retry = oy;
      var Pn = {};
      Object.defineProperty(Pn, '__esModule', { value: !0 }),
        (Pn.retryWhen = void 0);
      var uy = w,
        cy = I,
        ly = y,
        $o = $;
      function fy(e) {
        return ly.operate(function (t, r) {
          var n,
            i = !1,
            a,
            o = function () {
              (n = t.subscribe(
                $o.createOperatorSubscriber(r, void 0, void 0, function (u) {
                  a ||
                    ((a = new cy.Subject()),
                    uy.innerFrom(e(a)).subscribe(
                      $o.createOperatorSubscriber(r, function () {
                        return n ? o() : (i = !0);
                      })
                    )),
                    a && a.next(u);
                })
              )),
                i && (n.unsubscribe(), (n = null), (i = !1), o());
            };
          o();
        });
      }
      Pn.retryWhen = fy;
      var Ur = {};
      Object.defineProperty(Ur, '__esModule', { value: !0 }),
        (Ur.sample = void 0);
      var sy = w,
        vy = y,
        dy = W,
        wo = $;
      function by(e) {
        return vy.operate(function (t, r) {
          var n = !1,
            i = null;
          t.subscribe(
            wo.createOperatorSubscriber(r, function (a) {
              (n = !0), (i = a);
            })
          ),
            sy.innerFrom(e).subscribe(
              wo.createOperatorSubscriber(
                r,
                function () {
                  if (n) {
                    n = !1;
                    var a = i;
                    (i = null), r.next(a);
                  }
                },
                dy.noop
              )
            );
        });
      }
      Ur.sample = by;
      var An = {};
      Object.defineProperty(An, '__esModule', { value: !0 }),
        (An.sampleTime = void 0);
      var py = q,
        my = Ur,
        hy = wr;
      function yy(e, t) {
        return (
          t === void 0 && (t = py.asyncScheduler), my.sample(hy.interval(e, t))
        );
      }
      An.sampleTime = yy;
      var En = {};
      Object.defineProperty(En, '__esModule', { value: !0 }),
        (En.scan = void 0);
      var _y = y,
        gy = Fr;
      function Oy(e, t) {
        return _y.operate(gy.scanInternals(e, t, arguments.length >= 2, !0));
      }
      En.scan = Oy;
      var Mn = {};
      Object.defineProperty(Mn, '__esModule', { value: !0 }),
        (Mn.sequenceEqual = void 0);
      var Sy = y,
        $y = $,
        wy = w;
      function jy(e, t) {
        return (
          t === void 0 &&
            (t = function (r, n) {
              return r === n;
            }),
          Sy.operate(function (r, n) {
            var i = jo(),
              a = jo(),
              o = function (l) {
                n.next(l), n.complete();
              },
              u = function (l, c) {
                var f = $y.createOperatorSubscriber(
                  n,
                  function (s) {
                    var d = c.buffer,
                      p = c.complete;
                    d.length === 0
                      ? p
                        ? o(!1)
                        : l.buffer.push(s)
                      : !t(s, d.shift()) && o(!1);
                  },
                  function () {
                    l.complete = !0;
                    var s = c.complete,
                      d = c.buffer;
                    s && o(d.length === 0), f?.unsubscribe();
                  }
                );
                return f;
              };
            r.subscribe(u(i, a)), wy.innerFrom(e).subscribe(u(a, i));
          })
        );
      }
      Mn.sequenceEqual = jy;
      function jo() {
        return { buffer: [], complete: !1 };
      }
      var Vr = {},
        Py =
          (v && v.__read) ||
          function (e, t) {
            var r = typeof Symbol == 'function' && e[Symbol.iterator];
            if (!r) return e;
            var n = r.call(e),
              i,
              a = [],
              o;
            try {
              for (; (t === void 0 || t-- > 0) && !(i = n.next()).done; )
                a.push(i.value);
            } catch (u) {
              o = { error: u };
            } finally {
              try {
                i && !i.done && (r = n.return) && r.call(n);
              } finally {
                if (o) throw o.error;
              }
            }
            return a;
          },
        Ay =
          (v && v.__spreadArray) ||
          function (e, t) {
            for (var r = 0, n = t.length, i = e.length; r < n; r++, i++)
              e[i] = t[r];
            return e;
          };
      Object.defineProperty(Vr, '__esModule', { value: !0 }),
        (Vr.share = void 0);
      var Po = w,
        Ey = I,
        Ao = ke,
        My = y;
      function Fy(e) {
        e === void 0 && (e = {});
        var t = e.connector,
          r =
            t === void 0
              ? function () {
                  return new Ey.Subject();
                }
              : t,
          n = e.resetOnError,
          i = n === void 0 ? !0 : n,
          a = e.resetOnComplete,
          o = a === void 0 ? !0 : a,
          u = e.resetOnRefCountZero,
          l = u === void 0 ? !0 : u;
        return function (c) {
          var f,
            s,
            d,
            p = 0,
            m = !1,
            b = !1,
            h = function () {
              s?.unsubscribe(), (s = void 0);
            },
            g = function () {
              h(), (f = d = void 0), (m = b = !1);
            },
            _ = function () {
              var O = f;
              g(), O?.unsubscribe();
            };
          return My.operate(function (O, S) {
            p++, !b && !m && h();
            var j = (d = d ?? r());
            S.add(function () {
              p--, p === 0 && !b && !m && (s = Fi(_, l));
            }),
              j.subscribe(S),
              !f &&
                p > 0 &&
                ((f = new Ao.SafeSubscriber({
                  next: function (A) {
                    return j.next(A);
                  },
                  error: function (A) {
                    (b = !0), h(), (s = Fi(g, i, A)), j.error(A);
                  },
                  complete: function () {
                    (m = !0), h(), (s = Fi(g, o)), j.complete();
                  },
                })),
                Po.innerFrom(O).subscribe(f));
          })(c);
        };
      }
      Vr.share = Fy;
      function Fi(e, t) {
        for (var r = [], n = 2; n < arguments.length; n++)
          r[n - 2] = arguments[n];
        if (t === !0) {
          e();
          return;
        }
        if (t !== !1) {
          var i = new Ao.SafeSubscriber({
            next: function () {
              i.unsubscribe(), e();
            },
          });
          return Po.innerFrom(t.apply(void 0, Ay([], Py(r)))).subscribe(i);
        }
      }
      var Fn = {};
      Object.defineProperty(Fn, '__esModule', { value: !0 }),
        (Fn.shareReplay = void 0);
      var Ty = Re,
        Iy = Vr;
      function Cy(e, t, r) {
        var n,
          i,
          a,
          o,
          u = !1;
        return (
          e && typeof e == 'object'
            ? ((n = e.bufferSize),
              (o = n === void 0 ? 1 / 0 : n),
              (i = e.windowTime),
              (t = i === void 0 ? 1 / 0 : i),
              (a = e.refCount),
              (u = a === void 0 ? !1 : a),
              (r = e.scheduler))
            : (o = e ?? 1 / 0),
          Iy.share({
            connector: function () {
              return new Ty.ReplaySubject(o, t, r);
            },
            resetOnError: !0,
            resetOnComplete: !1,
            resetOnRefCountZero: u,
          })
        );
      }
      Fn.shareReplay = Cy;
      var Tn = {};
      Object.defineProperty(Tn, '__esModule', { value: !0 }),
        (Tn.single = void 0);
      var ky = Z,
        Ry = gr,
        Wy = _r,
        Ly = y,
        Ny = $;
      function Uy(e) {
        return Ly.operate(function (t, r) {
          var n = !1,
            i,
            a = !1,
            o = 0;
          t.subscribe(
            Ny.createOperatorSubscriber(
              r,
              function (u) {
                (a = !0),
                  (!e || e(u, o++, t)) &&
                    (n &&
                      r.error(new Ry.SequenceError('Too many matching values')),
                    (n = !0),
                    (i = u));
              },
              function () {
                n
                  ? (r.next(i), r.complete())
                  : r.error(
                      a
                        ? new Wy.NotFoundError('No matching values')
                        : new ky.EmptyError()
                    );
              }
            )
          );
        });
      }
      Tn.single = Uy;
      var In = {};
      Object.defineProperty(In, '__esModule', { value: !0 }),
        (In.skip = void 0);
      var Vy = ue;
      function qy(e) {
        return Vy.filter(function (t, r) {
          return e <= r;
        });
      }
      In.skip = qy;
      var Cn = {};
      Object.defineProperty(Cn, '__esModule', { value: !0 }),
        (Cn.skipLast = void 0);
      var zy = L,
        xy = y,
        By = $;
      function Dy(e) {
        return e <= 0
          ? zy.identity
          : xy.operate(function (t, r) {
              var n = new Array(e),
                i = 0;
              return (
                t.subscribe(
                  By.createOperatorSubscriber(r, function (a) {
                    var o = i++;
                    if (o < e) n[o] = a;
                    else {
                      var u = o % e,
                        l = n[u];
                      (n[u] = a), r.next(l);
                    }
                  })
                ),
                function () {
                  n = null;
                }
              );
            });
      }
      Cn.skipLast = Dy;
      var kn = {};
      Object.defineProperty(kn, '__esModule', { value: !0 }),
        (kn.skipUntil = void 0);
      var Yy = y,
        Eo = $,
        Gy = w,
        Ky = W;
      function Qy(e) {
        return Yy.operate(function (t, r) {
          var n = !1,
            i = Eo.createOperatorSubscriber(
              r,
              function () {
                i?.unsubscribe(), (n = !0);
              },
              Ky.noop
            );
          Gy.innerFrom(e).subscribe(i),
            t.subscribe(
              Eo.createOperatorSubscriber(r, function (a) {
                return n && r.next(a);
              })
            );
        });
      }
      kn.skipUntil = Qy;
      var Rn = {};
      Object.defineProperty(Rn, '__esModule', { value: !0 }),
        (Rn.skipWhile = void 0);
      var Jy = y,
        Xy = $;
      function Zy(e) {
        return Jy.operate(function (t, r) {
          var n = !1,
            i = 0;
          t.subscribe(
            Xy.createOperatorSubscriber(r, function (a) {
              return (n || (n = !e(a, i++))) && r.next(a);
            })
          );
        });
      }
      Rn.skipWhile = Zy;
      var Wn = {};
      Object.defineProperty(Wn, '__esModule', { value: !0 }),
        (Wn.startWith = void 0);
      var Mo = $e,
        Hy = C,
        e_ = y;
      function r_() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        var r = Hy.popScheduler(e);
        return e_.operate(function (n, i) {
          (r ? Mo.concat(e, n, r) : Mo.concat(e, n)).subscribe(i);
        });
      }
      Wn.startWith = r_;
      var Ln = {},
        Ie = {};
      Object.defineProperty(Ie, '__esModule', { value: !0 }),
        (Ie.switchMap = void 0);
      var t_ = w,
        n_ = y,
        Fo = $;
      function i_(e, t) {
        return n_.operate(function (r, n) {
          var i = null,
            a = 0,
            o = !1,
            u = function () {
              return o && !i && n.complete();
            };
          r.subscribe(
            Fo.createOperatorSubscriber(
              n,
              function (l) {
                i?.unsubscribe();
                var c = 0,
                  f = a++;
                t_.innerFrom(e(l, f)).subscribe(
                  (i = Fo.createOperatorSubscriber(
                    n,
                    function (s) {
                      return n.next(t ? t(l, s, f, c++) : s);
                    },
                    function () {
                      (i = null), u();
                    }
                  ))
                );
              },
              function () {
                (o = !0), u();
              }
            )
          );
        });
      }
      (Ie.switchMap = i_),
        Object.defineProperty(Ln, '__esModule', { value: !0 }),
        (Ln.switchAll = void 0);
      var a_ = Ie,
        o_ = L;
      function u_() {
        return a_.switchMap(o_.identity);
      }
      Ln.switchAll = u_;
      var Nn = {};
      Object.defineProperty(Nn, '__esModule', { value: !0 }),
        (Nn.switchMapTo = void 0);
      var To = Ie,
        c_ = E;
      function l_(e, t) {
        return c_.isFunction(t)
          ? To.switchMap(function () {
              return e;
            }, t)
          : To.switchMap(function () {
              return e;
            });
      }
      Nn.switchMapTo = l_;
      var Un = {};
      Object.defineProperty(Un, '__esModule', { value: !0 }),
        (Un.switchScan = void 0);
      var f_ = Ie,
        s_ = y;
      function v_(e, t) {
        return s_.operate(function (r, n) {
          var i = t;
          return (
            f_
              .switchMap(
                function (a, o) {
                  return e(i, a, o);
                },
                function (a, o) {
                  return (i = o), o;
                }
              )(r)
              .subscribe(n),
            function () {
              i = null;
            }
          );
        });
      }
      Un.switchScan = v_;
      var Vn = {};
      Object.defineProperty(Vn, '__esModule', { value: !0 }),
        (Vn.takeUntil = void 0);
      var d_ = y,
        b_ = $,
        p_ = w,
        m_ = W;
      function h_(e) {
        return d_.operate(function (t, r) {
          p_.innerFrom(e).subscribe(
            b_.createOperatorSubscriber(
              r,
              function () {
                return r.complete();
              },
              m_.noop
            )
          ),
            !r.closed && t.subscribe(r);
        });
      }
      Vn.takeUntil = h_;
      var qn = {};
      Object.defineProperty(qn, '__esModule', { value: !0 }),
        (qn.takeWhile = void 0);
      var y_ = y,
        __ = $;
      function g_(e, t) {
        return (
          t === void 0 && (t = !1),
          y_.operate(function (r, n) {
            var i = 0;
            r.subscribe(
              __.createOperatorSubscriber(n, function (a) {
                var o = e(a, i++);
                (o || t) && n.next(a), !o && n.complete();
              })
            );
          })
        );
      }
      qn.takeWhile = g_;
      var zn = {};
      Object.defineProperty(zn, '__esModule', { value: !0 }), (zn.tap = void 0);
      var O_ = E,
        S_ = y,
        $_ = $,
        w_ = L;
      function j_(e, t, r) {
        var n =
          O_.isFunction(e) || t || r ? { next: e, error: t, complete: r } : e;
        return n
          ? S_.operate(function (i, a) {
              var o;
              (o = n.subscribe) === null || o === void 0 || o.call(n);
              var u = !0;
              i.subscribe(
                $_.createOperatorSubscriber(
                  a,
                  function (l) {
                    var c;
                    (c = n.next) === null || c === void 0 || c.call(n, l),
                      a.next(l);
                  },
                  function () {
                    var l;
                    (u = !1),
                      (l = n.complete) === null || l === void 0 || l.call(n),
                      a.complete();
                  },
                  function (l) {
                    var c;
                    (u = !1),
                      (c = n.error) === null || c === void 0 || c.call(n, l),
                      a.error(l);
                  },
                  function () {
                    var l, c;
                    u &&
                      ((l = n.unsubscribe) === null ||
                        l === void 0 ||
                        l.call(n)),
                      (c = n.finalize) === null || c === void 0 || c.call(n);
                  }
                )
              );
            })
          : w_.identity;
      }
      zn.tap = j_;
      var Ti = {};
      (function (e) {
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.throttle = e.defaultThrottleConfig = void 0);
        var t = y,
          r = $,
          n = w;
        e.defaultThrottleConfig = { leading: !0, trailing: !1 };
        function i(a, o) {
          return (
            o === void 0 && (o = e.defaultThrottleConfig),
            t.operate(function (u, l) {
              var c = o.leading,
                f = o.trailing,
                s = !1,
                d = null,
                p = null,
                m = !1,
                b = function () {
                  p?.unsubscribe(), (p = null), f && (_(), m && l.complete());
                },
                h = function () {
                  (p = null), m && l.complete();
                },
                g = function (O) {
                  return (p = n
                    .innerFrom(a(O))
                    .subscribe(r.createOperatorSubscriber(l, b, h)));
                },
                _ = function () {
                  if (s) {
                    s = !1;
                    var O = d;
                    (d = null), l.next(O), !m && g(O);
                  }
                };
              u.subscribe(
                r.createOperatorSubscriber(
                  l,
                  function (O) {
                    (s = !0), (d = O), !(p && !p.closed) && (c ? _() : g(O));
                  },
                  function () {
                    (m = !0), !(f && s && p && !p.closed) && l.complete();
                  }
                )
              );
            })
          );
        }
        e.throttle = i;
      })(Ti);
      var xn = {};
      Object.defineProperty(xn, '__esModule', { value: !0 }),
        (xn.throttleTime = void 0);
      var P_ = q,
        Io = Ti,
        A_ = re;
      function E_(e, t, r) {
        t === void 0 && (t = P_.asyncScheduler),
          r === void 0 && (r = Io.defaultThrottleConfig);
        var n = A_.timer(e, t);
        return Io.throttle(function () {
          return n;
        }, r);
      }
      xn.throttleTime = E_;
      var Je = {};
      Object.defineProperty(Je, '__esModule', { value: !0 }),
        (Je.TimeInterval = Je.timeInterval = void 0);
      var M_ = q,
        F_ = y,
        T_ = $;
      function I_(e) {
        return (
          e === void 0 && (e = M_.asyncScheduler),
          F_.operate(function (t, r) {
            var n = e.now();
            t.subscribe(
              T_.createOperatorSubscriber(r, function (i) {
                var a = e.now(),
                  o = a - n;
                (n = a), r.next(new Co(i, o));
              })
            );
          })
        );
      }
      Je.timeInterval = I_;
      var Co = (function () {
        function e(t, r) {
          (this.value = t), (this.interval = r);
        }
        return e;
      })();
      Je.TimeInterval = Co;
      var Bn = {};
      Object.defineProperty(Bn, '__esModule', { value: !0 }),
        (Bn.timeoutWith = void 0);
      var C_ = q,
        k_ = xe,
        R_ = bt;
      function W_(e, t, r) {
        var n, i, a;
        if (
          ((r = r ?? C_.async),
          k_.isValidDate(e) ? (n = e) : typeof e == 'number' && (i = e),
          t)
        )
          a = function () {
            return t;
          };
        else throw new TypeError('No observable provided to switch to');
        if (n == null && i == null) throw new TypeError('No timeout provided.');
        return R_.timeout({ first: n, each: i, scheduler: r, with: a });
      }
      Bn.timeoutWith = W_;
      var Dn = {};
      Object.defineProperty(Dn, '__esModule', { value: !0 }),
        (Dn.timestamp = void 0);
      var L_ = Xr,
        N_ = ee;
      function U_(e) {
        return (
          e === void 0 && (e = L_.dateTimestampProvider),
          N_.map(function (t) {
            return { value: t, timestamp: e.now() };
          })
        );
      }
      Dn.timestamp = U_;
      var Yn = {};
      Object.defineProperty(Yn, '__esModule', { value: !0 }),
        (Yn.window = void 0);
      var ko = I,
        V_ = y,
        Ro = $,
        q_ = W,
        z_ = w;
      function x_(e) {
        return V_.operate(function (t, r) {
          var n = new ko.Subject();
          r.next(n.asObservable());
          var i = function (a) {
            n.error(a), r.error(a);
          };
          return (
            t.subscribe(
              Ro.createOperatorSubscriber(
                r,
                function (a) {
                  return n?.next(a);
                },
                function () {
                  n.complete(), r.complete();
                },
                i
              )
            ),
            z_.innerFrom(e).subscribe(
              Ro.createOperatorSubscriber(
                r,
                function () {
                  n.complete(), r.next((n = new ko.Subject()));
                },
                q_.noop,
                i
              )
            ),
            function () {
              n?.unsubscribe(), (n = null);
            }
          );
        });
      }
      Yn.window = x_;
      var Gn = {},
        B_ =
          (v && v.__values) ||
          function (e) {
            var t = typeof Symbol == 'function' && Symbol.iterator,
              r = t && e[t],
              n = 0;
            if (r) return r.call(e);
            if (e && typeof e.length == 'number')
              return {
                next: function () {
                  return (
                    e && n >= e.length && (e = void 0),
                    { value: e && e[n++], done: !e }
                  );
                },
              };
            throw new TypeError(
              t ? 'Object is not iterable.' : 'Symbol.iterator is not defined.'
            );
          };
      Object.defineProperty(Gn, '__esModule', { value: !0 }),
        (Gn.windowCount = void 0);
      var Wo = I,
        D_ = y,
        Y_ = $;
      function G_(e, t) {
        t === void 0 && (t = 0);
        var r = t > 0 ? t : e;
        return D_.operate(function (n, i) {
          var a = [new Wo.Subject()],
            o = 0;
          i.next(a[0].asObservable()),
            n.subscribe(
              Y_.createOperatorSubscriber(
                i,
                function (u) {
                  var l, c;
                  try {
                    for (var f = B_(a), s = f.next(); !s.done; s = f.next()) {
                      var d = s.value;
                      d.next(u);
                    }
                  } catch (b) {
                    l = { error: b };
                  } finally {
                    try {
                      s && !s.done && (c = f.return) && c.call(f);
                    } finally {
                      if (l) throw l.error;
                    }
                  }
                  var p = o - e + 1;
                  if (
                    (p >= 0 && p % r === 0 && a.shift().complete(),
                    ++o % r === 0)
                  ) {
                    var m = new Wo.Subject();
                    a.push(m), i.next(m.asObservable());
                  }
                },
                function () {
                  for (; a.length > 0; ) a.shift().complete();
                  i.complete();
                },
                function (u) {
                  for (; a.length > 0; ) a.shift().error(u);
                  i.error(u);
                },
                function () {
                  a = null;
                }
              )
            );
        });
      }
      Gn.windowCount = G_;
      var Kn = {};
      Object.defineProperty(Kn, '__esModule', { value: !0 }),
        (Kn.windowTime = void 0);
      var K_ = I,
        Q_ = q,
        J_ = R,
        X_ = y,
        Z_ = $,
        H_ = B,
        e1 = C,
        Lo = G;
      function r1(e) {
        for (var t, r, n = [], i = 1; i < arguments.length; i++)
          n[i - 1] = arguments[i];
        var a =
            (t = e1.popScheduler(n)) !== null && t !== void 0
              ? t
              : Q_.asyncScheduler,
          o = (r = n[0]) !== null && r !== void 0 ? r : null,
          u = n[1] || 1 / 0;
        return X_.operate(function (l, c) {
          var f = [],
            s = !1,
            d = function (h) {
              var g = h.window,
                _ = h.subs;
              g.complete(), _.unsubscribe(), H_.arrRemove(f, h), s && p();
            },
            p = function () {
              if (f) {
                var h = new J_.Subscription();
                c.add(h);
                var g = new K_.Subject(),
                  _ = { window: g, subs: h, seen: 0 };
                f.push(_),
                  c.next(g.asObservable()),
                  Lo.executeSchedule(
                    h,
                    a,
                    function () {
                      return d(_);
                    },
                    e
                  );
              }
            };
          o !== null && o >= 0 ? Lo.executeSchedule(c, a, p, o, !0) : (s = !0),
            p();
          var m = function (h) {
              return f.slice().forEach(h);
            },
            b = function (h) {
              m(function (g) {
                var _ = g.window;
                return h(_);
              }),
                h(c),
                c.unsubscribe();
            };
          return (
            l.subscribe(
              Z_.createOperatorSubscriber(
                c,
                function (h) {
                  m(function (g) {
                    g.window.next(h), u <= ++g.seen && d(g);
                  });
                },
                function () {
                  return b(function (h) {
                    return h.complete();
                  });
                },
                function (h) {
                  return b(function (g) {
                    return g.error(h);
                  });
                }
              )
            ),
            function () {
              f = null;
            }
          );
        });
      }
      Kn.windowTime = r1;
      var Qn = {},
        t1 =
          (v && v.__values) ||
          function (e) {
            var t = typeof Symbol == 'function' && Symbol.iterator,
              r = t && e[t],
              n = 0;
            if (r) return r.call(e);
            if (e && typeof e.length == 'number')
              return {
                next: function () {
                  return (
                    e && n >= e.length && (e = void 0),
                    { value: e && e[n++], done: !e }
                  );
                },
              };
            throw new TypeError(
              t ? 'Object is not iterable.' : 'Symbol.iterator is not defined.'
            );
          };
      Object.defineProperty(Qn, '__esModule', { value: !0 }),
        (Qn.windowToggle = void 0);
      var n1 = I,
        i1 = R,
        a1 = y,
        No = w,
        Ii = $,
        Uo = W,
        o1 = B;
      function u1(e, t) {
        return a1.operate(function (r, n) {
          var i = [],
            a = function (o) {
              for (; 0 < i.length; ) i.shift().error(o);
              n.error(o);
            };
          No.innerFrom(e).subscribe(
            Ii.createOperatorSubscriber(
              n,
              function (o) {
                var u = new n1.Subject();
                i.push(u);
                var l = new i1.Subscription(),
                  c = function () {
                    o1.arrRemove(i, u), u.complete(), l.unsubscribe();
                  },
                  f;
                try {
                  f = No.innerFrom(t(o));
                } catch (s) {
                  a(s);
                  return;
                }
                n.next(u.asObservable()),
                  l.add(
                    f.subscribe(Ii.createOperatorSubscriber(n, c, Uo.noop, a))
                  );
              },
              Uo.noop
            )
          ),
            r.subscribe(
              Ii.createOperatorSubscriber(
                n,
                function (o) {
                  var u,
                    l,
                    c = i.slice();
                  try {
                    for (var f = t1(c), s = f.next(); !s.done; s = f.next()) {
                      var d = s.value;
                      d.next(o);
                    }
                  } catch (p) {
                    u = { error: p };
                  } finally {
                    try {
                      s && !s.done && (l = f.return) && l.call(f);
                    } finally {
                      if (u) throw u.error;
                    }
                  }
                },
                function () {
                  for (; 0 < i.length; ) i.shift().complete();
                  n.complete();
                },
                a,
                function () {
                  for (; 0 < i.length; ) i.shift().unsubscribe();
                }
              )
            );
        });
      }
      Qn.windowToggle = u1;
      var Jn = {};
      Object.defineProperty(Jn, '__esModule', { value: !0 }),
        (Jn.windowWhen = void 0);
      var c1 = I,
        l1 = y,
        Vo = $,
        f1 = w;
      function s1(e) {
        return l1.operate(function (t, r) {
          var n,
            i,
            a = function (u) {
              n.error(u), r.error(u);
            },
            o = function () {
              i?.unsubscribe(),
                n?.complete(),
                (n = new c1.Subject()),
                r.next(n.asObservable());
              var u;
              try {
                u = f1.innerFrom(e());
              } catch (l) {
                a(l);
                return;
              }
              u.subscribe((i = Vo.createOperatorSubscriber(r, o, o, a)));
            };
          o(),
            t.subscribe(
              Vo.createOperatorSubscriber(
                r,
                function (u) {
                  return n.next(u);
                },
                function () {
                  n.complete(), r.complete();
                },
                a,
                function () {
                  i?.unsubscribe(), (n = null);
                }
              )
            );
        });
      }
      Jn.windowWhen = s1;
      var Xn = {},
        qo =
          (v && v.__read) ||
          function (e, t) {
            var r = typeof Symbol == 'function' && e[Symbol.iterator];
            if (!r) return e;
            var n = r.call(e),
              i,
              a = [],
              o;
            try {
              for (; (t === void 0 || t-- > 0) && !(i = n.next()).done; )
                a.push(i.value);
            } catch (u) {
              o = { error: u };
            } finally {
              try {
                i && !i.done && (r = n.return) && r.call(n);
              } finally {
                if (o) throw o.error;
              }
            }
            return a;
          },
        zo =
          (v && v.__spreadArray) ||
          function (e, t) {
            for (var r = 0, n = t.length, i = e.length; r < n; r++, i++)
              e[i] = t[r];
            return e;
          };
      Object.defineProperty(Xn, '__esModule', { value: !0 }),
        (Xn.withLatestFrom = void 0);
      var v1 = y,
        xo = $,
        d1 = w,
        b1 = L,
        p1 = W,
        m1 = C;
      function h1() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        var r = m1.popResultSelector(e);
        return v1.operate(function (n, i) {
          for (
            var a = e.length,
              o = new Array(a),
              u = e.map(function () {
                return !1;
              }),
              l = !1,
              c = function (s) {
                d1.innerFrom(e[s]).subscribe(
                  xo.createOperatorSubscriber(
                    i,
                    function (d) {
                      (o[s] = d),
                        !l &&
                          !u[s] &&
                          ((u[s] = !0),
                          (l = u.every(b1.identity)) && (u = null));
                    },
                    p1.noop
                  )
                );
              },
              f = 0;
            f < a;
            f++
          )
            c(f);
          n.subscribe(
            xo.createOperatorSubscriber(i, function (s) {
              if (l) {
                var d = zo([s], qo(o));
                i.next(r ? r.apply(void 0, zo([], qo(d))) : d);
              }
            })
          );
        });
      }
      Xn.withLatestFrom = h1;
      var Zn = {};
      Object.defineProperty(Zn, '__esModule', { value: !0 }),
        (Zn.zipAll = void 0);
      var y1 = Ye,
        _1 = Er;
      function g1(e) {
        return _1.joinAllInternals(y1.zip, e);
      }
      Zn.zipAll = g1;
      var Hn = {},
        ei = {},
        O1 =
          (v && v.__read) ||
          function (e, t) {
            var r = typeof Symbol == 'function' && e[Symbol.iterator];
            if (!r) return e;
            var n = r.call(e),
              i,
              a = [],
              o;
            try {
              for (; (t === void 0 || t-- > 0) && !(i = n.next()).done; )
                a.push(i.value);
            } catch (u) {
              o = { error: u };
            } finally {
              try {
                i && !i.done && (r = n.return) && r.call(n);
              } finally {
                if (o) throw o.error;
              }
            }
            return a;
          },
        S1 =
          (v && v.__spreadArray) ||
          function (e, t) {
            for (var r = 0, n = t.length, i = e.length; r < n; r++, i++)
              e[i] = t[r];
            return e;
          };
      Object.defineProperty(ei, '__esModule', { value: !0 }), (ei.zip = void 0);
      var $1 = Ye,
        w1 = y;
      function j1() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        return w1.operate(function (r, n) {
          $1.zip.apply(void 0, S1([r], O1(e))).subscribe(n);
        });
      }
      ei.zip = j1;
      var P1 =
          (v && v.__read) ||
          function (e, t) {
            var r = typeof Symbol == 'function' && e[Symbol.iterator];
            if (!r) return e;
            var n = r.call(e),
              i,
              a = [],
              o;
            try {
              for (; (t === void 0 || t-- > 0) && !(i = n.next()).done; )
                a.push(i.value);
            } catch (u) {
              o = { error: u };
            } finally {
              try {
                i && !i.done && (r = n.return) && r.call(n);
              } finally {
                if (o) throw o.error;
              }
            }
            return a;
          },
        A1 =
          (v && v.__spreadArray) ||
          function (e, t) {
            for (var r = 0, n = t.length, i = e.length; r < n; r++, i++)
              e[i] = t[r];
            return e;
          };
      Object.defineProperty(Hn, '__esModule', { value: !0 }),
        (Hn.zipWith = void 0);
      var E1 = ei;
      function M1() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        return E1.zip.apply(void 0, A1([], P1(e)));
      }
      (Hn.zipWith = M1),
        (function (e) {
          var t =
              (v && v.__createBinding) ||
              (Object.create
                ? function (er, rr, ce, Ce) {
                    Ce === void 0 && (Ce = ce),
                      Object.defineProperty(er, Ce, {
                        enumerable: !0,
                        get: function () {
                          return rr[ce];
                        },
                      });
                  }
                : function (er, rr, ce, Ce) {
                    Ce === void 0 && (Ce = ce), (er[Ce] = rr[ce]);
                  }),
            r =
              (v && v.__exportStar) ||
              function (er, rr) {
                for (var ce in er)
                  ce !== 'default' &&
                    !Object.prototype.hasOwnProperty.call(rr, ce) &&
                    t(rr, er, ce);
              };
          Object.defineProperty(e, '__esModule', { value: !0 }),
            (e.interval =
              e.iif =
              e.generate =
              e.fromEventPattern =
              e.fromEvent =
              e.from =
              e.forkJoin =
              e.empty =
              e.defer =
              e.connectable =
              e.concat =
              e.combineLatest =
              e.bindNodeCallback =
              e.bindCallback =
              e.UnsubscriptionError =
              e.TimeoutError =
              e.SequenceError =
              e.ObjectUnsubscribedError =
              e.NotFoundError =
              e.EmptyError =
              e.ArgumentOutOfRangeError =
              e.firstValueFrom =
              e.lastValueFrom =
              e.isObservable =
              e.identity =
              e.noop =
              e.pipe =
              e.NotificationKind =
              e.Notification =
              e.Subscriber =
              e.Subscription =
              e.Scheduler =
              e.VirtualAction =
              e.VirtualTimeScheduler =
              e.animationFrameScheduler =
              e.animationFrame =
              e.queueScheduler =
              e.queue =
              e.asyncScheduler =
              e.async =
              e.asapScheduler =
              e.asap =
              e.AsyncSubject =
              e.ReplaySubject =
              e.BehaviorSubject =
              e.Subject =
              e.animationFrames =
              e.observable =
              e.ConnectableObservable =
              e.Observable =
                void 0),
            (e.filter =
              e.expand =
              e.exhaustMap =
              e.exhaustAll =
              e.exhaust =
              e.every =
              e.endWith =
              e.elementAt =
              e.distinctUntilKeyChanged =
              e.distinctUntilChanged =
              e.distinct =
              e.dematerialize =
              e.delayWhen =
              e.delay =
              e.defaultIfEmpty =
              e.debounceTime =
              e.debounce =
              e.count =
              e.connect =
              e.concatWith =
              e.concatMapTo =
              e.concatMap =
              e.concatAll =
              e.combineLatestWith =
              e.combineLatestAll =
              e.combineAll =
              e.catchError =
              e.bufferWhen =
              e.bufferToggle =
              e.bufferTime =
              e.bufferCount =
              e.buffer =
              e.auditTime =
              e.audit =
              e.config =
              e.NEVER =
              e.EMPTY =
              e.scheduled =
              e.zip =
              e.using =
              e.timer =
              e.throwError =
              e.range =
              e.race =
              e.partition =
              e.pairs =
              e.onErrorResumeNext =
              e.of =
              e.never =
              e.merge =
                void 0),
            (e.switchMap =
              e.switchAll =
              e.subscribeOn =
              e.startWith =
              e.skipWhile =
              e.skipUntil =
              e.skipLast =
              e.skip =
              e.single =
              e.shareReplay =
              e.share =
              e.sequenceEqual =
              e.scan =
              e.sampleTime =
              e.sample =
              e.refCount =
              e.retryWhen =
              e.retry =
              e.repeatWhen =
              e.repeat =
              e.reduce =
              e.raceWith =
              e.publishReplay =
              e.publishLast =
              e.publishBehavior =
              e.publish =
              e.pluck =
              e.pairwise =
              e.onErrorResumeNextWith =
              e.observeOn =
              e.multicast =
              e.min =
              e.mergeWith =
              e.mergeScan =
              e.mergeMapTo =
              e.mergeMap =
              e.flatMap =
              e.mergeAll =
              e.max =
              e.materialize =
              e.mapTo =
              e.map =
              e.last =
              e.isEmpty =
              e.ignoreElements =
              e.groupBy =
              e.first =
              e.findIndex =
              e.find =
              e.finalize =
                void 0),
            (e.zipWith =
              e.zipAll =
              e.withLatestFrom =
              e.windowWhen =
              e.windowToggle =
              e.windowTime =
              e.windowCount =
              e.window =
              e.toArray =
              e.timestamp =
              e.timeoutWith =
              e.timeout =
              e.timeInterval =
              e.throwIfEmpty =
              e.throttleTime =
              e.throttle =
              e.tap =
              e.takeWhile =
              e.takeUntil =
              e.takeLast =
              e.take =
              e.switchScan =
              e.switchMapTo =
                void 0);
          var n = F;
          Object.defineProperty(e, 'Observable', {
            enumerable: !0,
            get: function () {
              return n.Observable;
            },
          });
          var i = ye;
          Object.defineProperty(e, 'ConnectableObservable', {
            enumerable: !0,
            get: function () {
              return i.ConnectableObservable;
            },
          });
          var a = he;
          Object.defineProperty(e, 'observable', {
            enumerable: !0,
            get: function () {
              return a.observable;
            },
          });
          var o = Jr;
          Object.defineProperty(e, 'animationFrames', {
            enumerable: !0,
            get: function () {
              return o.animationFrames;
            },
          });
          var u = I;
          Object.defineProperty(e, 'Subject', {
            enumerable: !0,
            get: function () {
              return u.Subject;
            },
          });
          var l = ur;
          Object.defineProperty(e, 'BehaviorSubject', {
            enumerable: !0,
            get: function () {
              return l.BehaviorSubject;
            },
          });
          var c = Re;
          Object.defineProperty(e, 'ReplaySubject', {
            enumerable: !0,
            get: function () {
              return c.ReplaySubject;
            },
          });
          var f = We;
          Object.defineProperty(e, 'AsyncSubject', {
            enumerable: !0,
            get: function () {
              return f.AsyncSubject;
            },
          });
          var s = oa;
          Object.defineProperty(e, 'asap', {
            enumerable: !0,
            get: function () {
              return s.asap;
            },
          }),
            Object.defineProperty(e, 'asapScheduler', {
              enumerable: !0,
              get: function () {
                return s.asapScheduler;
              },
            });
          var d = q;
          Object.defineProperty(e, 'async', {
            enumerable: !0,
            get: function () {
              return d.async;
            },
          }),
            Object.defineProperty(e, 'asyncScheduler', {
              enumerable: !0,
              get: function () {
                return d.asyncScheduler;
              },
            });
          var p = da;
          Object.defineProperty(e, 'queue', {
            enumerable: !0,
            get: function () {
              return p.queue;
            },
          }),
            Object.defineProperty(e, 'queueScheduler', {
              enumerable: !0,
              get: function () {
                return p.queueScheduler;
              },
            });
          var m = ba;
          Object.defineProperty(e, 'animationFrame', {
            enumerable: !0,
            get: function () {
              return m.animationFrame;
            },
          }),
            Object.defineProperty(e, 'animationFrameScheduler', {
              enumerable: !0,
              get: function () {
                return m.animationFrameScheduler;
              },
            });
          var b = Ne;
          Object.defineProperty(e, 'VirtualTimeScheduler', {
            enumerable: !0,
            get: function () {
              return b.VirtualTimeScheduler;
            },
          }),
            Object.defineProperty(e, 'VirtualAction', {
              enumerable: !0,
              get: function () {
                return b.VirtualAction;
              },
            });
          var h = cr;
          Object.defineProperty(e, 'Scheduler', {
            enumerable: !0,
            get: function () {
              return h.Scheduler;
            },
          });
          var g = R;
          Object.defineProperty(e, 'Subscription', {
            enumerable: !0,
            get: function () {
              return g.Subscription;
            },
          });
          var _ = ke;
          Object.defineProperty(e, 'Subscriber', {
            enumerable: !0,
            get: function () {
              return _.Subscriber;
            },
          });
          var O = ot;
          Object.defineProperty(e, 'Notification', {
            enumerable: !0,
            get: function () {
              return O.Notification;
            },
          }),
            Object.defineProperty(e, 'NotificationKind', {
              enumerable: !0,
              get: function () {
                return O.NotificationKind;
              },
            });
          var S = ae;
          Object.defineProperty(e, 'pipe', {
            enumerable: !0,
            get: function () {
              return S.pipe;
            },
          });
          var j = W;
          Object.defineProperty(e, 'noop', {
            enumerable: !0,
            get: function () {
              return j.noop;
            },
          });
          var A = L;
          Object.defineProperty(e, 'identity', {
            enumerable: !0,
            get: function () {
              return A.identity;
            },
          });
          var P = st;
          Object.defineProperty(e, 'isObservable', {
            enumerable: !0,
            get: function () {
              return P.isObservable;
            },
          });
          var U = vt;
          Object.defineProperty(e, 'lastValueFrom', {
            enumerable: !0,
            get: function () {
              return U.lastValueFrom;
            },
          });
          var Q = dt;
          Object.defineProperty(e, 'firstValueFrom', {
            enumerable: !0,
            get: function () {
              return Q.firstValueFrom;
            },
          });
          var Yr = yr;
          Object.defineProperty(e, 'ArgumentOutOfRangeError', {
            enumerable: !0,
            get: function () {
              return Yr.ArgumentOutOfRangeError;
            },
          });
          var li = Z;
          Object.defineProperty(e, 'EmptyError', {
            enumerable: !0,
            get: function () {
              return li.EmptyError;
            },
          });
          var Gr = _r;
          Object.defineProperty(e, 'NotFoundError', {
            enumerable: !0,
            get: function () {
              return Gr.NotFoundError;
            },
          });
          var Vi = or;
          Object.defineProperty(e, 'ObjectUnsubscribedError', {
            enumerable: !0,
            get: function () {
              return Vi.ObjectUnsubscribedError;
            },
          });
          var h0 = gr;
          Object.defineProperty(e, 'SequenceError', {
            enumerable: !0,
            get: function () {
              return h0.SequenceError;
            },
          });
          var y0 = bt;
          Object.defineProperty(e, 'TimeoutError', {
            enumerable: !0,
            get: function () {
              return y0.TimeoutError;
            },
          });
          var _0 = tr;
          Object.defineProperty(e, 'UnsubscriptionError', {
            enumerable: !0,
            get: function () {
              return _0.UnsubscriptionError;
            },
          });
          var g0 = pt;
          Object.defineProperty(e, 'bindCallback', {
            enumerable: !0,
            get: function () {
              return g0.bindCallback;
            },
          });
          var O0 = mt;
          Object.defineProperty(e, 'bindNodeCallback', {
            enumerable: !0,
            get: function () {
              return O0.bindNodeCallback;
            },
          });
          var S0 = be;
          Object.defineProperty(e, 'combineLatest', {
            enumerable: !0,
            get: function () {
              return S0.combineLatest;
            },
          });
          var $0 = $e;
          Object.defineProperty(e, 'concat', {
            enumerable: !0,
            get: function () {
              return $0.concat;
            },
          });
          var w0 = ht;
          Object.defineProperty(e, 'connectable', {
            enumerable: !0,
            get: function () {
              return w0.connectable;
            },
          });
          var j0 = je;
          Object.defineProperty(e, 'defer', {
            enumerable: !0,
            get: function () {
              return j0.defer;
            },
          });
          var P0 = D;
          Object.defineProperty(e, 'empty', {
            enumerable: !0,
            get: function () {
              return P0.empty;
            },
          });
          var A0 = yt;
          Object.defineProperty(e, 'forkJoin', {
            enumerable: !0,
            get: function () {
              return A0.forkJoin;
            },
          });
          var E0 = Y;
          Object.defineProperty(e, 'from', {
            enumerable: !0,
            get: function () {
              return E0.from;
            },
          });
          var M0 = _t;
          Object.defineProperty(e, 'fromEvent', {
            enumerable: !0,
            get: function () {
              return M0.fromEvent;
            },
          });
          var F0 = gt;
          Object.defineProperty(e, 'fromEventPattern', {
            enumerable: !0,
            get: function () {
              return F0.fromEventPattern;
            },
          });
          var T0 = Ot;
          Object.defineProperty(e, 'generate', {
            enumerable: !0,
            get: function () {
              return T0.generate;
            },
          });
          var I0 = St;
          Object.defineProperty(e, 'iif', {
            enumerable: !0,
            get: function () {
              return I0.iif;
            },
          });
          var C0 = wr;
          Object.defineProperty(e, 'interval', {
            enumerable: !0,
            get: function () {
              return C0.interval;
            },
          });
          var k0 = $t;
          Object.defineProperty(e, 'merge', {
            enumerable: !0,
            get: function () {
              return k0.merge;
            },
          });
          var R0 = Pi;
          Object.defineProperty(e, 'never', {
            enumerable: !0,
            get: function () {
              return R0.never;
            },
          });
          var W0 = Ue;
          Object.defineProperty(e, 'of', {
            enumerable: !0,
            get: function () {
              return W0.of;
            },
          });
          var L0 = jr;
          Object.defineProperty(e, 'onErrorResumeNext', {
            enumerable: !0,
            get: function () {
              return L0.onErrorResumeNext;
            },
          });
          var N0 = wt;
          Object.defineProperty(e, 'pairs', {
            enumerable: !0,
            get: function () {
              return N0.pairs;
            },
          });
          var U0 = jt;
          Object.defineProperty(e, 'partition', {
            enumerable: !0,
            get: function () {
              return U0.partition;
            },
          });
          var V0 = Ae;
          Object.defineProperty(e, 'race', {
            enumerable: !0,
            get: function () {
              return V0.race;
            },
          });
          var q0 = At;
          Object.defineProperty(e, 'range', {
            enumerable: !0,
            get: function () {
              return q0.range;
            },
          });
          var z0 = hr;
          Object.defineProperty(e, 'throwError', {
            enumerable: !0,
            get: function () {
              return z0.throwError;
            },
          });
          var x0 = re;
          Object.defineProperty(e, 'timer', {
            enumerable: !0,
            get: function () {
              return x0.timer;
            },
          });
          var B0 = Et;
          Object.defineProperty(e, 'using', {
            enumerable: !0,
            get: function () {
              return B0.using;
            },
          });
          var D0 = Ye;
          Object.defineProperty(e, 'zip', {
            enumerable: !0,
            get: function () {
              return D0.zip;
            },
          });
          var Y0 = lr;
          Object.defineProperty(e, 'scheduled', {
            enumerable: !0,
            get: function () {
              return Y0.scheduled;
            },
          });
          var G0 = D;
          Object.defineProperty(e, 'EMPTY', {
            enumerable: !0,
            get: function () {
              return G0.EMPTY;
            },
          });
          var K0 = Pi;
          Object.defineProperty(e, 'NEVER', {
            enumerable: !0,
            get: function () {
              return K0.NEVER;
            },
          }),
            r(Da, e);
          var Q0 = le;
          Object.defineProperty(e, 'config', {
            enumerable: !0,
            get: function () {
              return Q0.config;
            },
          });
          var J0 = Pr;
          Object.defineProperty(e, 'audit', {
            enumerable: !0,
            get: function () {
              return J0.audit;
            },
          });
          var X0 = Mt;
          Object.defineProperty(e, 'auditTime', {
            enumerable: !0,
            get: function () {
              return X0.auditTime;
            },
          });
          var Z0 = Ft;
          Object.defineProperty(e, 'buffer', {
            enumerable: !0,
            get: function () {
              return Z0.buffer;
            },
          });
          var H0 = Tt;
          Object.defineProperty(e, 'bufferCount', {
            enumerable: !0,
            get: function () {
              return H0.bufferCount;
            },
          });
          var eg = It;
          Object.defineProperty(e, 'bufferTime', {
            enumerable: !0,
            get: function () {
              return eg.bufferTime;
            },
          });
          var rg = Ct;
          Object.defineProperty(e, 'bufferToggle', {
            enumerable: !0,
            get: function () {
              return rg.bufferToggle;
            },
          });
          var tg = kt;
          Object.defineProperty(e, 'bufferWhen', {
            enumerable: !0,
            get: function () {
              return tg.bufferWhen;
            },
          });
          var ng = Rt;
          Object.defineProperty(e, 'catchError', {
            enumerable: !0,
            get: function () {
              return ng.catchError;
            },
          });
          var ig = Wt;
          Object.defineProperty(e, 'combineAll', {
            enumerable: !0,
            get: function () {
              return ig.combineAll;
            },
          });
          var ag = Ar;
          Object.defineProperty(e, 'combineLatestAll', {
            enumerable: !0,
            get: function () {
              return ag.combineLatestAll;
            },
          });
          var og = Lt;
          Object.defineProperty(e, 'combineLatestWith', {
            enumerable: !0,
            get: function () {
              return og.combineLatestWith;
            },
          });
          var ug = Be;
          Object.defineProperty(e, 'concatAll', {
            enumerable: !0,
            get: function () {
              return ug.concatAll;
            },
          });
          var cg = Tr;
          Object.defineProperty(e, 'concatMap', {
            enumerable: !0,
            get: function () {
              return cg.concatMap;
            },
          });
          var lg = Ut;
          Object.defineProperty(e, 'concatMapTo', {
            enumerable: !0,
            get: function () {
              return lg.concatMapTo;
            },
          });
          var fg = Vt;
          Object.defineProperty(e, 'concatWith', {
            enumerable: !0,
            get: function () {
              return fg.concatWith;
            },
          });
          var sg = Ge;
          Object.defineProperty(e, 'connect', {
            enumerable: !0,
            get: function () {
              return sg.connect;
            },
          });
          var vg = xt;
          Object.defineProperty(e, 'count', {
            enumerable: !0,
            get: function () {
              return vg.count;
            },
          });
          var dg = Bt;
          Object.defineProperty(e, 'debounce', {
            enumerable: !0,
            get: function () {
              return dg.debounce;
            },
          });
          var bg = Dt;
          Object.defineProperty(e, 'debounceTime', {
            enumerable: !0,
            get: function () {
              return bg.debounceTime;
            },
          });
          var pg = Ee;
          Object.defineProperty(e, 'defaultIfEmpty', {
            enumerable: !0,
            get: function () {
              return pg.defaultIfEmpty;
            },
          });
          var mg = Yt;
          Object.defineProperty(e, 'delay', {
            enumerable: !0,
            get: function () {
              return mg.delay;
            },
          });
          var hg = Ir;
          Object.defineProperty(e, 'delayWhen', {
            enumerable: !0,
            get: function () {
              return hg.delayWhen;
            },
          });
          var yg = Gt;
          Object.defineProperty(e, 'dematerialize', {
            enumerable: !0,
            get: function () {
              return yg.dematerialize;
            },
          });
          var _g = Kt;
          Object.defineProperty(e, 'distinct', {
            enumerable: !0,
            get: function () {
              return _g.distinct;
            },
          });
          var gg = Rr;
          Object.defineProperty(e, 'distinctUntilChanged', {
            enumerable: !0,
            get: function () {
              return gg.distinctUntilChanged;
            },
          });
          var Og = Qt;
          Object.defineProperty(e, 'distinctUntilKeyChanged', {
            enumerable: !0,
            get: function () {
              return Og.distinctUntilKeyChanged;
            },
          });
          var Sg = Jt;
          Object.defineProperty(e, 'elementAt', {
            enumerable: !0,
            get: function () {
              return Sg.elementAt;
            },
          });
          var $g = Xt;
          Object.defineProperty(e, 'endWith', {
            enumerable: !0,
            get: function () {
              return $g.endWith;
            },
          });
          var wg = Zt;
          Object.defineProperty(e, 'every', {
            enumerable: !0,
            get: function () {
              return wg.every;
            },
          });
          var jg = Ht;
          Object.defineProperty(e, 'exhaust', {
            enumerable: !0,
            get: function () {
              return jg.exhaust;
            },
          });
          var Pg = Wr;
          Object.defineProperty(e, 'exhaustAll', {
            enumerable: !0,
            get: function () {
              return Pg.exhaustAll;
            },
          });
          var Ag = Lr;
          Object.defineProperty(e, 'exhaustMap', {
            enumerable: !0,
            get: function () {
              return Ag.exhaustMap;
            },
          });
          var Eg = en;
          Object.defineProperty(e, 'expand', {
            enumerable: !0,
            get: function () {
              return Eg.expand;
            },
          });
          var Mg = ue;
          Object.defineProperty(e, 'filter', {
            enumerable: !0,
            get: function () {
              return Mg.filter;
            },
          });
          var Fg = rn;
          Object.defineProperty(e, 'finalize', {
            enumerable: !0,
            get: function () {
              return Fg.finalize;
            },
          });
          var Tg = Te;
          Object.defineProperty(e, 'find', {
            enumerable: !0,
            get: function () {
              return Tg.find;
            },
          });
          var Ig = tn;
          Object.defineProperty(e, 'findIndex', {
            enumerable: !0,
            get: function () {
              return Ig.findIndex;
            },
          });
          var Cg = nn;
          Object.defineProperty(e, 'first', {
            enumerable: !0,
            get: function () {
              return Cg.first;
            },
          });
          var kg = an;
          Object.defineProperty(e, 'groupBy', {
            enumerable: !0,
            get: function () {
              return kg.groupBy;
            },
          });
          var Rg = Cr;
          Object.defineProperty(e, 'ignoreElements', {
            enumerable: !0,
            get: function () {
              return Rg.ignoreElements;
            },
          });
          var Wg = on;
          Object.defineProperty(e, 'isEmpty', {
            enumerable: !0,
            get: function () {
              return Wg.isEmpty;
            },
          });
          var Lg = un;
          Object.defineProperty(e, 'last', {
            enumerable: !0,
            get: function () {
              return Lg.last;
            },
          });
          var Ng = ee;
          Object.defineProperty(e, 'map', {
            enumerable: !0,
            get: function () {
              return Ng.map;
            },
          });
          var Ug = kr;
          Object.defineProperty(e, 'mapTo', {
            enumerable: !0,
            get: function () {
              return Ug.mapTo;
            },
          });
          var Vg = cn;
          Object.defineProperty(e, 'materialize', {
            enumerable: !0,
            get: function () {
              return Vg.materialize;
            },
          });
          var qg = ln;
          Object.defineProperty(e, 'max', {
            enumerable: !0,
            get: function () {
              return qg.max;
            },
          });
          var zg = we;
          Object.defineProperty(e, 'mergeAll', {
            enumerable: !0,
            get: function () {
              return zg.mergeAll;
            },
          });
          var xg = fn;
          Object.defineProperty(e, 'flatMap', {
            enumerable: !0,
            get: function () {
              return xg.flatMap;
            },
          });
          var Bg = K;
          Object.defineProperty(e, 'mergeMap', {
            enumerable: !0,
            get: function () {
              return Bg.mergeMap;
            },
          });
          var Dg = sn;
          Object.defineProperty(e, 'mergeMapTo', {
            enumerable: !0,
            get: function () {
              return Dg.mergeMapTo;
            },
          });
          var Yg = vn;
          Object.defineProperty(e, 'mergeScan', {
            enumerable: !0,
            get: function () {
              return Yg.mergeScan;
            },
          });
          var Gg = dn;
          Object.defineProperty(e, 'mergeWith', {
            enumerable: !0,
            get: function () {
              return Gg.mergeWith;
            },
          });
          var Kg = pn;
          Object.defineProperty(e, 'min', {
            enumerable: !0,
            get: function () {
              return Kg.min;
            },
          });
          var Qg = Ke;
          Object.defineProperty(e, 'multicast', {
            enumerable: !0,
            get: function () {
              return Qg.multicast;
            },
          });
          var Jg = Oe;
          Object.defineProperty(e, 'observeOn', {
            enumerable: !0,
            get: function () {
              return Jg.observeOn;
            },
          });
          var Xg = Qe;
          Object.defineProperty(e, 'onErrorResumeNextWith', {
            enumerable: !0,
            get: function () {
              return Xg.onErrorResumeNextWith;
            },
          });
          var Zg = mn;
          Object.defineProperty(e, 'pairwise', {
            enumerable: !0,
            get: function () {
              return Zg.pairwise;
            },
          });
          var Hg = hn;
          Object.defineProperty(e, 'pluck', {
            enumerable: !0,
            get: function () {
              return Hg.pluck;
            },
          });
          var eO = yn;
          Object.defineProperty(e, 'publish', {
            enumerable: !0,
            get: function () {
              return eO.publish;
            },
          });
          var rO = _n;
          Object.defineProperty(e, 'publishBehavior', {
            enumerable: !0,
            get: function () {
              return rO.publishBehavior;
            },
          });
          var tO = gn;
          Object.defineProperty(e, 'publishLast', {
            enumerable: !0,
            get: function () {
              return tO.publishLast;
            },
          });
          var nO = On;
          Object.defineProperty(e, 'publishReplay', {
            enumerable: !0,
            get: function () {
              return nO.publishReplay;
            },
          });
          var iO = Sn;
          Object.defineProperty(e, 'raceWith', {
            enumerable: !0,
            get: function () {
              return iO.raceWith;
            },
          });
          var aO = pe;
          Object.defineProperty(e, 'reduce', {
            enumerable: !0,
            get: function () {
              return aO.reduce;
            },
          });
          var oO = $n;
          Object.defineProperty(e, 'repeat', {
            enumerable: !0,
            get: function () {
              return oO.repeat;
            },
          });
          var uO = wn;
          Object.defineProperty(e, 'repeatWhen', {
            enumerable: !0,
            get: function () {
              return uO.repeatWhen;
            },
          });
          var cO = jn;
          Object.defineProperty(e, 'retry', {
            enumerable: !0,
            get: function () {
              return cO.retry;
            },
          });
          var lO = Pn;
          Object.defineProperty(e, 'retryWhen', {
            enumerable: !0,
            get: function () {
              return lO.retryWhen;
            },
          });
          var fO = ar;
          Object.defineProperty(e, 'refCount', {
            enumerable: !0,
            get: function () {
              return fO.refCount;
            },
          });
          var sO = Ur;
          Object.defineProperty(e, 'sample', {
            enumerable: !0,
            get: function () {
              return sO.sample;
            },
          });
          var vO = An;
          Object.defineProperty(e, 'sampleTime', {
            enumerable: !0,
            get: function () {
              return vO.sampleTime;
            },
          });
          var dO = En;
          Object.defineProperty(e, 'scan', {
            enumerable: !0,
            get: function () {
              return dO.scan;
            },
          });
          var bO = Mn;
          Object.defineProperty(e, 'sequenceEqual', {
            enumerable: !0,
            get: function () {
              return bO.sequenceEqual;
            },
          });
          var pO = Vr;
          Object.defineProperty(e, 'share', {
            enumerable: !0,
            get: function () {
              return pO.share;
            },
          });
          var mO = Fn;
          Object.defineProperty(e, 'shareReplay', {
            enumerable: !0,
            get: function () {
              return mO.shareReplay;
            },
          });
          var hO = Tn;
          Object.defineProperty(e, 'single', {
            enumerable: !0,
            get: function () {
              return hO.single;
            },
          });
          var yO = In;
          Object.defineProperty(e, 'skip', {
            enumerable: !0,
            get: function () {
              return yO.skip;
            },
          });
          var _O = Cn;
          Object.defineProperty(e, 'skipLast', {
            enumerable: !0,
            get: function () {
              return _O.skipLast;
            },
          });
          var gO = kn;
          Object.defineProperty(e, 'skipUntil', {
            enumerable: !0,
            get: function () {
              return gO.skipUntil;
            },
          });
          var OO = Rn;
          Object.defineProperty(e, 'skipWhile', {
            enumerable: !0,
            get: function () {
              return OO.skipWhile;
            },
          });
          var SO = Wn;
          Object.defineProperty(e, 'startWith', {
            enumerable: !0,
            get: function () {
              return SO.startWith;
            },
          });
          var $O = Se;
          Object.defineProperty(e, 'subscribeOn', {
            enumerable: !0,
            get: function () {
              return $O.subscribeOn;
            },
          });
          var wO = Ln;
          Object.defineProperty(e, 'switchAll', {
            enumerable: !0,
            get: function () {
              return wO.switchAll;
            },
          });
          var jO = Ie;
          Object.defineProperty(e, 'switchMap', {
            enumerable: !0,
            get: function () {
              return jO.switchMap;
            },
          });
          var PO = Nn;
          Object.defineProperty(e, 'switchMapTo', {
            enumerable: !0,
            get: function () {
              return PO.switchMapTo;
            },
          });
          var AO = Un;
          Object.defineProperty(e, 'switchScan', {
            enumerable: !0,
            get: function () {
              return AO.switchScan;
            },
          });
          var EO = Me;
          Object.defineProperty(e, 'take', {
            enumerable: !0,
            get: function () {
              return EO.take;
            },
          });
          var MO = Nr;
          Object.defineProperty(e, 'takeLast', {
            enumerable: !0,
            get: function () {
              return MO.takeLast;
            },
          });
          var FO = Vn;
          Object.defineProperty(e, 'takeUntil', {
            enumerable: !0,
            get: function () {
              return FO.takeUntil;
            },
          });
          var TO = qn;
          Object.defineProperty(e, 'takeWhile', {
            enumerable: !0,
            get: function () {
              return TO.takeWhile;
            },
          });
          var IO = zn;
          Object.defineProperty(e, 'tap', {
            enumerable: !0,
            get: function () {
              return IO.tap;
            },
          });
          var CO = Ti;
          Object.defineProperty(e, 'throttle', {
            enumerable: !0,
            get: function () {
              return CO.throttle;
            },
          });
          var kO = xn;
          Object.defineProperty(e, 'throttleTime', {
            enumerable: !0,
            get: function () {
              return kO.throttleTime;
            },
          });
          var RO = Fe;
          Object.defineProperty(e, 'throwIfEmpty', {
            enumerable: !0,
            get: function () {
              return RO.throwIfEmpty;
            },
          });
          var WO = Je;
          Object.defineProperty(e, 'timeInterval', {
            enumerable: !0,
            get: function () {
              return WO.timeInterval;
            },
          });
          var LO = bt;
          Object.defineProperty(e, 'timeout', {
            enumerable: !0,
            get: function () {
              return LO.timeout;
            },
          });
          var NO = Bn;
          Object.defineProperty(e, 'timeoutWith', {
            enumerable: !0,
            get: function () {
              return NO.timeoutWith;
            },
          });
          var UO = Dn;
          Object.defineProperty(e, 'timestamp', {
            enumerable: !0,
            get: function () {
              return UO.timestamp;
            },
          });
          var VO = Mr;
          Object.defineProperty(e, 'toArray', {
            enumerable: !0,
            get: function () {
              return VO.toArray;
            },
          });
          var qO = Yn;
          Object.defineProperty(e, 'window', {
            enumerable: !0,
            get: function () {
              return qO.window;
            },
          });
          var zO = Gn;
          Object.defineProperty(e, 'windowCount', {
            enumerable: !0,
            get: function () {
              return zO.windowCount;
            },
          });
          var xO = Kn;
          Object.defineProperty(e, 'windowTime', {
            enumerable: !0,
            get: function () {
              return xO.windowTime;
            },
          });
          var BO = Qn;
          Object.defineProperty(e, 'windowToggle', {
            enumerable: !0,
            get: function () {
              return BO.windowToggle;
            },
          });
          var DO = Jn;
          Object.defineProperty(e, 'windowWhen', {
            enumerable: !0,
            get: function () {
              return DO.windowWhen;
            },
          });
          var YO = Xn;
          Object.defineProperty(e, 'withLatestFrom', {
            enumerable: !0,
            get: function () {
              return YO.withLatestFrom;
            },
          });
          var GO = Zn;
          Object.defineProperty(e, 'zipAll', {
            enumerable: !0,
            get: function () {
              return GO.zipAll;
            },
          });
          var KO = Hn;
          Object.defineProperty(e, 'zipWith', {
            enumerable: !0,
            get: function () {
              return KO.zipWith;
            },
          });
        })(zi),
        (function (e) {
          var t = zi;
          function r(l, c, f, s) {
            Object.defineProperty(l, c, {
              get: f,
              set: s,
              enumerable: !0,
              configurable: !0,
            });
          }
          r(e.exports, 'withAnimationFrame', () => i),
            r(e.exports, 'fromEventElement$', () => a),
            r(e.exports, 'fromValueElementKeyup$', () => o),
            r(e.exports, 'classSync', () => u),
            (window.rxjsx = (l, c, ...f) => {
              if (typeof l == 'function') return l(c, ...f);
              const s = document.createElement(l);
              return (
                Object.entries(c || {}).forEach(([d, p]) => {
                  d.startsWith('on') && d.toLowerCase() in window
                    ? s.addEventListener(d.toLowerCase().substr(2), p)
                    : d === 'single$'
                    ? p
                        .pipe(
                          (0, t.scan)(
                            (b, h) => (
                              b && s.removeChild(b), h && s.appendChild(h), h
                            ),
                            void 0
                          )
                        )
                        .subscribe({ complete: () => s.remove() })
                    : d === 'multi$'
                    ? p
                        .pipe((0, t.map)((b) => (b && s.appendChild(b), b)))
                        .subscribe({ complete: () => s.remove() })
                    : s.setAttribute(d, p?.toString());
                }),
                f.forEach((d) => {
                  n(s, d);
                }),
                s
              );
            }),
            (window.JSX = window.rxjsx);
          const n = (l, c) => {
              Array.isArray(c)
                ? c.forEach((f) => n(l, f))
                : l.appendChild(c.nodeType ? c : document.createTextNode(c));
            },
            i = (0, t.switchMap)(
              async (l) =>
                await new Promise((c) => {
                  t.animationFrameScheduler.schedule(() => {
                    c(l);
                  });
                })
            );
          function a(l, c) {
            return l.pipe((0, t.switchMap)((f) => (0, t.fromEvent)(f, c)));
          }
          function o(l, c) {
            return l.pipe(
              (0, t.switchMap)((f) =>
                (0, t.fromEvent)(f, 'keyup').pipe(
                  (0, t.pluck)('target', 'value')
                )
              ),
              (0, t.startWith)(c || '')
            );
          }
          function u(l, c, f) {
            f ? l.classList.add(c) : l.classList.remove(c);
          }
        })(cu);
      function F1(e) {
        if (e.sheet) return e.sheet;
        for (var t = 0; t < document.styleSheets.length; t++)
          if (document.styleSheets[t].ownerNode === e)
            return document.styleSheets[t];
      }
      function T1(e) {
        var t = document.createElement('style');
        return (
          t.setAttribute('data-emotion', e.key),
          e.nonce !== void 0 && t.setAttribute('nonce', e.nonce),
          t.appendChild(document.createTextNode('')),
          t.setAttribute('data-s', ''),
          t
        );
      }
      var I1 = (function () {
          function e(r) {
            var n = this;
            (this._insertTag = function (i) {
              var a;
              n.tags.length === 0
                ? n.insertionPoint
                  ? (a = n.insertionPoint.nextSibling)
                  : n.prepend
                  ? (a = n.container.firstChild)
                  : (a = n.before)
                : (a = n.tags[n.tags.length - 1].nextSibling),
                n.container.insertBefore(i, a),
                n.tags.push(i);
            }),
              (this.isSpeedy = r.speedy === void 0 ? !0 : r.speedy),
              (this.tags = []),
              (this.ctr = 0),
              (this.nonce = r.nonce),
              (this.key = r.key),
              (this.container = r.container),
              (this.prepend = r.prepend),
              (this.insertionPoint = r.insertionPoint),
              (this.before = null);
          }
          var t = e.prototype;
          return (
            (t.hydrate = function (n) {
              n.forEach(this._insertTag);
            }),
            (t.insert = function (n) {
              this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 &&
                this._insertTag(T1(this));
              var i = this.tags[this.tags.length - 1];
              if (this.isSpeedy) {
                var a = F1(i);
                try {
                  a.insertRule(n, a.cssRules.length);
                } catch {}
              } else i.appendChild(document.createTextNode(n));
              this.ctr++;
            }),
            (t.flush = function () {
              this.tags.forEach(function (n) {
                return n.parentNode && n.parentNode.removeChild(n);
              }),
                (this.tags = []),
                (this.ctr = 0);
            }),
            e
          );
        })(),
        V = '-ms-',
        ri = '-moz-',
        M = '-webkit-',
        Bo = 'comm',
        Ci = 'rule',
        ki = 'decl',
        C1 = '@import',
        Do = '@keyframes',
        k1 = Math.abs,
        ti = String.fromCharCode,
        R1 = Object.assign;
      function W1(e, t) {
        return N(e, 0) ^ 45
          ? (((((((t << 2) ^ N(e, 0)) << 2) ^ N(e, 1)) << 2) ^ N(e, 2)) << 2) ^
              N(e, 3)
          : 0;
      }
      function Yo(e) {
        return e.trim();
      }
      function L1(e, t) {
        return (e = t.exec(e)) ? e[0] : e;
      }
      function T(e, t, r) {
        return e.replace(t, r);
      }
      function Ri(e, t) {
        return e.indexOf(t);
      }
      function N(e, t) {
        return e.charCodeAt(t) | 0;
      }
      function qr(e, t, r) {
        return e.slice(t, r);
      }
      function te(e) {
        return e.length;
      }
      function Wi(e) {
        return e.length;
      }
      function ni(e, t) {
        return t.push(e), e;
      }
      function N1(e, t) {
        return e.map(t).join('');
      }
      var ii = 1,
        Xe = 1,
        Go = 0,
        z = 0,
        k = 0,
        Ze = '';
      function ai(e, t, r, n, i, a, o) {
        return {
          value: e,
          root: t,
          parent: r,
          type: n,
          props: i,
          children: a,
          line: ii,
          column: Xe,
          length: o,
          return: '',
        };
      }
      function zr(e, t) {
        return R1(
          ai('', null, null, '', null, null, 0),
          e,
          { length: -e.length },
          t
        );
      }
      function U1() {
        return k;
      }
      function V1() {
        return (
          (k = z > 0 ? N(Ze, --z) : 0), Xe--, k === 10 && ((Xe = 1), ii--), k
        );
      }
      function x() {
        return (
          (k = z < Go ? N(Ze, z++) : 0), Xe++, k === 10 && ((Xe = 1), ii++), k
        );
      }
      function ne() {
        return N(Ze, z);
      }
      function oi() {
        return z;
      }
      function xr(e, t) {
        return qr(Ze, e, t);
      }
      function Br(e) {
        switch (e) {
          case 0:
          case 9:
          case 10:
          case 13:
          case 32:
            return 5;
          case 33:
          case 43:
          case 44:
          case 47:
          case 62:
          case 64:
          case 126:
          case 59:
          case 123:
          case 125:
            return 4;
          case 58:
            return 3;
          case 34:
          case 39:
          case 40:
          case 91:
            return 2;
          case 41:
          case 93:
            return 1;
        }
        return 0;
      }
      function Ko(e) {
        return (ii = Xe = 1), (Go = te((Ze = e))), (z = 0), [];
      }
      function Qo(e) {
        return (Ze = ''), e;
      }
      function ui(e) {
        return Yo(xr(z - 1, Li(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
      }
      function q1(e) {
        for (; (k = ne()) && k < 33; ) x();
        return Br(e) > 2 || Br(k) > 3 ? '' : ' ';
      }
      function z1(e, t) {
        for (
          ;
          --t &&
          x() &&
          !(k < 48 || k > 102 || (k > 57 && k < 65) || (k > 70 && k < 97));

        );
        return xr(e, oi() + (t < 6 && ne() == 32 && x() == 32));
      }
      function Li(e) {
        for (; x(); )
          switch (k) {
            case e:
              return z;
            case 34:
            case 39:
              e !== 34 && e !== 39 && Li(k);
              break;
            case 40:
              e === 41 && Li(e);
              break;
            case 92:
              x();
              break;
          }
        return z;
      }
      function x1(e, t) {
        for (; x() && e + k !== 47 + 10; )
          if (e + k === 42 + 42 && ne() === 47) break;
        return '/*' + xr(t, z - 1) + '*' + ti(e === 47 ? e : x());
      }
      function B1(e) {
        for (; !Br(ne()); ) x();
        return xr(e, z);
      }
      function D1(e) {
        return Qo(ci('', null, null, null, [''], (e = Ko(e)), 0, [0], e));
      }
      function ci(e, t, r, n, i, a, o, u, l) {
        for (
          var c = 0,
            f = 0,
            s = o,
            d = 0,
            p = 0,
            m = 0,
            b = 1,
            h = 1,
            g = 1,
            _ = 0,
            O = '',
            S = i,
            j = a,
            A = n,
            P = O;
          h;

        )
          switch (((m = _), (_ = x()))) {
            case 40:
              if (m != 108 && N(P, s - 1) == 58) {
                Ri((P += T(ui(_), '&', '&\f')), '&\f') != -1 && (g = -1);
                break;
              }
            case 34:
            case 39:
            case 91:
              P += ui(_);
              break;
            case 9:
            case 10:
            case 13:
            case 32:
              P += q1(m);
              break;
            case 92:
              P += z1(oi() - 1, 7);
              continue;
            case 47:
              switch (ne()) {
                case 42:
                case 47:
                  ni(Y1(x1(x(), oi()), t, r), l);
                  break;
                default:
                  P += '/';
              }
              break;
            case 123 * b:
              u[c++] = te(P) * g;
            case 125 * b:
            case 59:
            case 0:
              switch (_) {
                case 0:
                case 125:
                  h = 0;
                case 59 + f:
                  p > 0 &&
                    te(P) - s &&
                    ni(
                      p > 32
                        ? Xo(P + ';', n, r, s - 1)
                        : Xo(T(P, ' ', '') + ';', n, r, s - 2),
                      l
                    );
                  break;
                case 59:
                  P += ';';
                default:
                  if (
                    (ni(
                      (A = Jo(P, t, r, c, f, i, u, O, (S = []), (j = []), s)),
                      a
                    ),
                    _ === 123)
                  )
                    if (f === 0) ci(P, t, A, A, S, a, s, u, j);
                    else
                      switch (d === 99 && N(P, 3) === 110 ? 100 : d) {
                        case 100:
                        case 109:
                        case 115:
                          ci(
                            e,
                            A,
                            A,
                            n &&
                              ni(Jo(e, A, A, 0, 0, i, u, O, i, (S = []), s), j),
                            i,
                            j,
                            s,
                            u,
                            n ? S : j
                          );
                          break;
                        default:
                          ci(P, A, A, A, [''], j, 0, u, j);
                      }
              }
              (c = f = p = 0), (b = g = 1), (O = P = ''), (s = o);
              break;
            case 58:
              (s = 1 + te(P)), (p = m);
            default:
              if (b < 1) {
                if (_ == 123) --b;
                else if (_ == 125 && b++ == 0 && V1() == 125) continue;
              }
              switch (((P += ti(_)), _ * b)) {
                case 38:
                  g = f > 0 ? 1 : ((P += '\f'), -1);
                  break;
                case 44:
                  (u[c++] = (te(P) - 1) * g), (g = 1);
                  break;
                case 64:
                  ne() === 45 && (P += ui(x())),
                    (d = ne()),
                    (f = s = te((O = P += B1(oi())))),
                    _++;
                  break;
                case 45:
                  m === 45 && te(P) == 2 && (b = 0);
              }
          }
        return a;
      }
      function Jo(e, t, r, n, i, a, o, u, l, c, f) {
        for (
          var s = i - 1, d = i === 0 ? a : [''], p = Wi(d), m = 0, b = 0, h = 0;
          m < n;
          ++m
        )
          for (
            var g = 0, _ = qr(e, s + 1, (s = k1((b = o[m])))), O = e;
            g < p;
            ++g
          )
            (O = Yo(b > 0 ? d[g] + ' ' + _ : T(_, /&\f/g, d[g]))) &&
              (l[h++] = O);
        return ai(e, t, r, i === 0 ? Ci : u, l, c, f);
      }
      function Y1(e, t, r) {
        return ai(e, t, r, Bo, ti(U1()), qr(e, 2, -2), 0);
      }
      function Xo(e, t, r, n) {
        return ai(e, t, r, ki, qr(e, 0, n), qr(e, n + 1, -1), n);
      }
      function He(e, t) {
        for (var r = '', n = Wi(e), i = 0; i < n; i++)
          r += t(e[i], i, e, t) || '';
        return r;
      }
      function G1(e, t, r, n) {
        switch (e.type) {
          case C1:
          case ki:
            return (e.return = e.return || e.value);
          case Bo:
            return '';
          case Do:
            return (e.return = e.value + '{' + He(e.children, n) + '}');
          case Ci:
            e.value = e.props.join(',');
        }
        return te((r = He(e.children, n)))
          ? (e.return = e.value + '{' + r + '}')
          : '';
      }
      function K1(e) {
        var t = Wi(e);
        return function (r, n, i, a) {
          for (var o = '', u = 0; u < t; u++) o += e[u](r, n, i, a) || '';
          return o;
        };
      }
      function Q1(e) {
        return function (t) {
          t.root || ((t = t.return) && e(t));
        };
      }
      function J1(e) {
        var t = Object.create(null);
        return function (r) {
          return t[r] === void 0 && (t[r] = e(r)), t[r];
        };
      }
      var X1 = function (t, r, n) {
          for (
            var i = 0, a = 0;
            (i = a), (a = ne()), i === 38 && a === 12 && (r[n] = 1), !Br(a);

          )
            x();
          return xr(t, z);
        },
        Z1 = function (t, r) {
          var n = -1,
            i = 44;
          do
            switch (Br(i)) {
              case 0:
                i === 38 && ne() === 12 && (r[n] = 1),
                  (t[n] += X1(z - 1, r, n));
                break;
              case 2:
                t[n] += ui(i);
                break;
              case 4:
                if (i === 44) {
                  (t[++n] = ne() === 58 ? '&\f' : ''), (r[n] = t[n].length);
                  break;
                }
              default:
                t[n] += ti(i);
            }
          while ((i = x()));
          return t;
        },
        H1 = function (t, r) {
          return Qo(Z1(Ko(t), r));
        },
        Zo = new WeakMap(),
        e0 = function (t) {
          if (!(t.type !== 'rule' || !t.parent || t.length < 1)) {
            for (
              var r = t.value,
                n = t.parent,
                i = t.column === n.column && t.line === n.line;
              n.type !== 'rule';

            )
              if (((n = n.parent), !n)) return;
            if (
              !(t.props.length === 1 && r.charCodeAt(0) !== 58 && !Zo.get(n)) &&
              !i
            ) {
              Zo.set(t, !0);
              for (
                var a = [], o = H1(r, a), u = n.props, l = 0, c = 0;
                l < o.length;
                l++
              )
                for (var f = 0; f < u.length; f++, c++)
                  t.props[c] = a[l]
                    ? o[l].replace(/&\f/g, u[f])
                    : u[f] + ' ' + o[l];
            }
          }
        },
        r0 = function (t) {
          if (t.type === 'decl') {
            var r = t.value;
            r.charCodeAt(0) === 108 &&
              r.charCodeAt(2) === 98 &&
              ((t.return = ''), (t.value = ''));
          }
        };
      function Ho(e, t) {
        switch (W1(e, t)) {
          case 5103:
            return M + 'print-' + e + e;
          case 5737:
          case 4201:
          case 3177:
          case 3433:
          case 1641:
          case 4457:
          case 2921:
          case 5572:
          case 6356:
          case 5844:
          case 3191:
          case 6645:
          case 3005:
          case 6391:
          case 5879:
          case 5623:
          case 6135:
          case 4599:
          case 4855:
          case 4215:
          case 6389:
          case 5109:
          case 5365:
          case 5621:
          case 3829:
            return M + e + e;
          case 5349:
          case 4246:
          case 4810:
          case 6968:
          case 2756:
            return M + e + ri + e + V + e + e;
          case 6828:
          case 4268:
            return M + e + V + e + e;
          case 6165:
            return M + e + V + 'flex-' + e + e;
          case 5187:
            return (
              M +
              e +
              T(e, /(\w+).+(:[^]+)/, M + 'box-$1$2' + V + 'flex-$1$2') +
              e
            );
          case 5443:
            return M + e + V + 'flex-item-' + T(e, /flex-|-self/, '') + e;
          case 4675:
            return (
              M +
              e +
              V +
              'flex-line-pack' +
              T(e, /align-content|flex-|-self/, '') +
              e
            );
          case 5548:
            return M + e + V + T(e, 'shrink', 'negative') + e;
          case 5292:
            return M + e + V + T(e, 'basis', 'preferred-size') + e;
          case 6060:
            return (
              M +
              'box-' +
              T(e, '-grow', '') +
              M +
              e +
              V +
              T(e, 'grow', 'positive') +
              e
            );
          case 4554:
            return M + T(e, /([^-])(transform)/g, '$1' + M + '$2') + e;
          case 6187:
            return (
              T(
                T(T(e, /(zoom-|grab)/, M + '$1'), /(image-set)/, M + '$1'),
                e,
                ''
              ) + e
            );
          case 5495:
          case 3959:
            return T(e, /(image-set\([^]*)/, M + '$1$`$1');
          case 4968:
            return (
              T(
                T(
                  e,
                  /(.+:)(flex-)?(.*)/,
                  M + 'box-pack:$3' + V + 'flex-pack:$3'
                ),
                /s.+-b[^;]+/,
                'justify'
              ) +
              M +
              e +
              e
            );
          case 4095:
          case 3583:
          case 4068:
          case 2532:
            return T(e, /(.+)-inline(.+)/, M + '$1$2') + e;
          case 8116:
          case 7059:
          case 5753:
          case 5535:
          case 5445:
          case 5701:
          case 4933:
          case 4677:
          case 5533:
          case 5789:
          case 5021:
          case 4765:
            if (te(e) - 1 - t > 6)
              switch (N(e, t + 1)) {
                case 109:
                  if (N(e, t + 4) !== 45) break;
                case 102:
                  return (
                    T(
                      e,
                      /(.+:)(.+)-([^]+)/,
                      '$1' +
                        M +
                        '$2-$3$1' +
                        ri +
                        (N(e, t + 3) == 108 ? '$3' : '$2-$3')
                    ) + e
                  );
                case 115:
                  return ~Ri(e, 'stretch')
                    ? Ho(T(e, 'stretch', 'fill-available'), t) + e
                    : e;
              }
            break;
          case 4949:
            if (N(e, t + 1) !== 115) break;
          case 6444:
            switch (N(e, te(e) - 3 - (~Ri(e, '!important') && 10))) {
              case 107:
                return T(e, ':', ':' + M) + e;
              case 101:
                return (
                  T(
                    e,
                    /(.+:)([^;!]+)(;|!.+)?/,
                    '$1' +
                      M +
                      (N(e, 14) === 45 ? 'inline-' : '') +
                      'box$3$1' +
                      M +
                      '$2$3$1' +
                      V +
                      '$2box$3'
                  ) + e
                );
            }
            break;
          case 5936:
            switch (N(e, t + 11)) {
              case 114:
                return M + e + V + T(e, /[svh]\w+-[tblr]{2}/, 'tb') + e;
              case 108:
                return M + e + V + T(e, /[svh]\w+-[tblr]{2}/, 'tb-rl') + e;
              case 45:
                return M + e + V + T(e, /[svh]\w+-[tblr]{2}/, 'lr') + e;
            }
            return M + e + V + e + e;
        }
        return e;
      }
      var t0 = function (t, r, n, i) {
          if (t.length > -1 && !t.return)
            switch (t.type) {
              case ki:
                t.return = Ho(t.value, t.length);
                break;
              case Do:
                return He([zr(t, { value: T(t.value, '@', '@' + M) })], i);
              case Ci:
                if (t.length)
                  return N1(t.props, function (a) {
                    switch (L1(a, /(::plac\w+|:read-\w+)/)) {
                      case ':read-only':
                      case ':read-write':
                        return He(
                          [
                            zr(t, {
                              props: [T(a, /:(read-\w+)/, ':' + ri + '$1')],
                            }),
                          ],
                          i
                        );
                      case '::placeholder':
                        return He(
                          [
                            zr(t, {
                              props: [T(a, /:(plac\w+)/, ':' + M + 'input-$1')],
                            }),
                            zr(t, {
                              props: [T(a, /:(plac\w+)/, ':' + ri + '$1')],
                            }),
                            zr(t, {
                              props: [T(a, /:(plac\w+)/, V + 'input-$1')],
                            }),
                          ],
                          i
                        );
                    }
                    return '';
                  });
            }
        },
        n0 = [t0],
        i0 = function (t) {
          var r = t.key;
          if (r === 'css') {
            var n = document.querySelectorAll(
              'style[data-emotion]:not([data-s])'
            );
            Array.prototype.forEach.call(n, function (b) {
              var h = b.getAttribute('data-emotion');
              h.indexOf(' ') !== -1 &&
                (document.head.appendChild(b), b.setAttribute('data-s', ''));
            });
          }
          var i = t.stylisPlugins || n0,
            a = {},
            o,
            u = [];
          (o = t.container || document.head),
            Array.prototype.forEach.call(
              document.querySelectorAll('style[data-emotion^="' + r + ' "]'),
              function (b) {
                for (
                  var h = b.getAttribute('data-emotion').split(' '), g = 1;
                  g < h.length;
                  g++
                )
                  a[h[g]] = !0;
                u.push(b);
              }
            );
          var l,
            c = [e0, r0];
          {
            var f,
              s = [
                G1,
                Q1(function (b) {
                  f.insert(b);
                }),
              ],
              d = K1(c.concat(i, s)),
              p = function (h) {
                return He(D1(h), d);
              };
            l = function (h, g, _, O) {
              (f = _),
                p(h ? h + '{' + g.styles + '}' : g.styles),
                O && (m.inserted[g.name] = !0);
            };
          }
          var m = {
            key: r,
            sheet: new I1({
              key: r,
              container: o,
              nonce: t.nonce,
              speedy: t.speedy,
              prepend: t.prepend,
              insertionPoint: t.insertionPoint,
            }),
            nonce: t.nonce,
            inserted: a,
            registered: {},
            insert: l,
          };
          return m.sheet.hydrate(u), m;
        };
      function a0(e) {
        for (var t = 0, r, n = 0, i = e.length; i >= 4; ++n, i -= 4)
          (r =
            (e.charCodeAt(n) & 255) |
            ((e.charCodeAt(++n) & 255) << 8) |
            ((e.charCodeAt(++n) & 255) << 16) |
            ((e.charCodeAt(++n) & 255) << 24)),
            (r = (r & 65535) * 1540483477 + (((r >>> 16) * 59797) << 16)),
            (r ^= r >>> 24),
            (t =
              ((r & 65535) * 1540483477 + (((r >>> 16) * 59797) << 16)) ^
              ((t & 65535) * 1540483477 + (((t >>> 16) * 59797) << 16)));
        switch (i) {
          case 3:
            t ^= (e.charCodeAt(n + 2) & 255) << 16;
          case 2:
            t ^= (e.charCodeAt(n + 1) & 255) << 8;
          case 1:
            (t ^= e.charCodeAt(n) & 255),
              (t = (t & 65535) * 1540483477 + (((t >>> 16) * 59797) << 16));
        }
        return (
          (t ^= t >>> 13),
          (t = (t & 65535) * 1540483477 + (((t >>> 16) * 59797) << 16)),
          ((t ^ (t >>> 15)) >>> 0).toString(36)
        );
      }
      var o0 = {
          animationIterationCount: 1,
          borderImageOutset: 1,
          borderImageSlice: 1,
          borderImageWidth: 1,
          boxFlex: 1,
          boxFlexGroup: 1,
          boxOrdinalGroup: 1,
          columnCount: 1,
          columns: 1,
          flex: 1,
          flexGrow: 1,
          flexPositive: 1,
          flexShrink: 1,
          flexNegative: 1,
          flexOrder: 1,
          gridRow: 1,
          gridRowEnd: 1,
          gridRowSpan: 1,
          gridRowStart: 1,
          gridColumn: 1,
          gridColumnEnd: 1,
          gridColumnSpan: 1,
          gridColumnStart: 1,
          msGridRow: 1,
          msGridRowSpan: 1,
          msGridColumn: 1,
          msGridColumnSpan: 1,
          fontWeight: 1,
          lineHeight: 1,
          opacity: 1,
          order: 1,
          orphans: 1,
          tabSize: 1,
          widows: 1,
          zIndex: 1,
          zoom: 1,
          WebkitLineClamp: 1,
          fillOpacity: 1,
          floodOpacity: 1,
          stopOpacity: 1,
          strokeDasharray: 1,
          strokeDashoffset: 1,
          strokeMiterlimit: 1,
          strokeOpacity: 1,
          strokeWidth: 1,
        },
        u0 = /[A-Z]|^ms/g,
        c0 = /_EMO_([^_]+?)_([^]*?)_EMO_/g,
        eu = function (t) {
          return t.charCodeAt(1) === 45;
        },
        ru = function (t) {
          return t != null && typeof t != 'boolean';
        },
        Ni = J1(function (e) {
          return eu(e) ? e : e.replace(u0, '-$&').toLowerCase();
        }),
        tu = function (t, r) {
          switch (t) {
            case 'animation':
            case 'animationName':
              if (typeof r == 'string')
                return r.replace(c0, function (n, i, a) {
                  return (ie = { name: i, styles: a, next: ie }), i;
                });
          }
          return o0[t] !== 1 && !eu(t) && typeof r == 'number' && r !== 0
            ? r + 'px'
            : r;
        },
        JO =
          'Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.';
      function Dr(e, t, r) {
        if (r == null) return '';
        if (r.__emotion_styles !== void 0) return r;
        switch (typeof r) {
          case 'boolean':
            return '';
          case 'object': {
            if (r.anim === 1)
              return (
                (ie = { name: r.name, styles: r.styles, next: ie }), r.name
              );
            if (r.styles !== void 0) {
              var n = r.next;
              if (n !== void 0)
                for (; n !== void 0; )
                  (ie = { name: n.name, styles: n.styles, next: ie }),
                    (n = n.next);
              var i = r.styles + ';';
              return i;
            }
            return l0(e, t, r);
          }
          case 'function': {
            if (e !== void 0) {
              var a = ie,
                o = r(e);
              return (ie = a), Dr(e, t, o);
            }
            break;
          }
        }
        if (t == null) return r;
        var u = t[r];
        return u !== void 0 ? u : r;
      }
      function l0(e, t, r) {
        var n = '';
        if (Array.isArray(r))
          for (var i = 0; i < r.length; i++) n += Dr(e, t, r[i]) + ';';
        else
          for (var a in r) {
            var o = r[a];
            if (typeof o != 'object')
              t != null && t[o] !== void 0
                ? (n += a + '{' + t[o] + '}')
                : ru(o) && (n += Ni(a) + ':' + tu(a, o) + ';');
            else if (
              Array.isArray(o) &&
              typeof o[0] == 'string' &&
              (t == null || t[o[0]] === void 0)
            )
              for (var u = 0; u < o.length; u++)
                ru(o[u]) && (n += Ni(a) + ':' + tu(a, o[u]) + ';');
            else {
              var l = Dr(e, t, o);
              switch (a) {
                case 'animation':
                case 'animationName': {
                  n += Ni(a) + ':' + l + ';';
                  break;
                }
                default:
                  n += a + '{' + l + '}';
              }
            }
          }
        return n;
      }
      var nu = /label:\s*([^\s;\n{]+)\s*(;|$)/g,
        ie,
        Ui = function (t, r, n) {
          if (
            t.length === 1 &&
            typeof t[0] == 'object' &&
            t[0] !== null &&
            t[0].styles !== void 0
          )
            return t[0];
          var i = !0,
            a = '';
          ie = void 0;
          var o = t[0];
          o == null || o.raw === void 0
            ? ((i = !1), (a += Dr(n, r, o)))
            : (a += o[0]);
          for (var u = 1; u < t.length; u++)
            (a += Dr(n, r, t[u])), i && (a += o[u]);
          nu.lastIndex = 0;
          for (var l = '', c; (c = nu.exec(a)) !== null; ) l += '-' + c[1];
          var f = a0(a) + l;
          return { name: f, styles: a, next: ie };
        },
        f0 = !0;
      function iu(e, t, r) {
        var n = '';
        return (
          r.split(' ').forEach(function (i) {
            e[i] !== void 0 ? t.push(e[i] + ';') : (n += i + ' ');
          }),
          n
        );
      }
      var s0 = function (t, r, n) {
          var i = t.key + '-' + r.name;
          (n === !1 || f0 === !1) &&
            t.registered[i] === void 0 &&
            (t.registered[i] = r.styles);
        },
        v0 = function (t, r, n) {
          s0(t, r, n);
          var i = t.key + '-' + r.name;
          if (t.inserted[r.name] === void 0) {
            var a = r;
            do t.insert(r === a ? '.' + i : '', a, t.sheet, !0), (a = a.next);
            while (a !== void 0);
          }
        };
      function au(e, t) {
        if (e.inserted[t.name] === void 0) return e.insert('', t, e.sheet, !0);
      }
      function ou(e, t, r) {
        var n = [],
          i = iu(e, n, r);
        return n.length < 2 ? r : i + t(n);
      }
      var d0 = function (t) {
          var r = i0(t);
          (r.sheet.speedy = function (u) {
            this.isSpeedy = u;
          }),
            (r.compat = !0);
          var n = function () {
              for (
                var l = arguments.length, c = new Array(l), f = 0;
                f < l;
                f++
              )
                c[f] = arguments[f];
              var s = Ui(c, r.registered, void 0);
              return v0(r, s, !1), r.key + '-' + s.name;
            },
            i = function () {
              for (
                var l = arguments.length, c = new Array(l), f = 0;
                f < l;
                f++
              )
                c[f] = arguments[f];
              var s = Ui(c, r.registered),
                d = 'animation-' + s.name;
              return (
                au(r, {
                  name: s.name,
                  styles: '@keyframes ' + d + '{' + s.styles + '}',
                }),
                d
              );
            },
            a = function () {
              for (
                var l = arguments.length, c = new Array(l), f = 0;
                f < l;
                f++
              )
                c[f] = arguments[f];
              var s = Ui(c, r.registered);
              au(r, s);
            },
            o = function () {
              for (
                var l = arguments.length, c = new Array(l), f = 0;
                f < l;
                f++
              )
                c[f] = arguments[f];
              return ou(r.registered, n, b0(c));
            };
          return {
            css: n,
            cx: o,
            injectGlobal: a,
            keyframes: i,
            hydrate: function (l) {
              l.forEach(function (c) {
                r.inserted[c] = !0;
              });
            },
            flush: function () {
              (r.registered = {}), (r.inserted = {}), r.sheet.flush();
            },
            sheet: r.sheet,
            cache: r,
            getRegisteredStyles: iu.bind(null, r.registered),
            merge: ou.bind(null, r.registered, n),
          };
        },
        b0 = function e(t) {
          for (var r = '', n = 0; n < t.length; n++) {
            var i = t[n];
            if (i != null) {
              var a = void 0;
              switch (typeof i) {
                case 'boolean':
                  break;
                case 'object': {
                  if (Array.isArray(i)) a = e(i);
                  else {
                    a = '';
                    for (var o in i) i[o] && o && (a && (a += ' '), (a += o));
                  }
                  break;
                }
                default:
                  a = i;
              }
              a && (r && (r += ' '), (r += a));
            }
          }
          return r;
        },
        p0 = d0({ key: 'css' }),
        m0 = p0.css;
      function uu() {
        return JSX(
          'div',
          {
            class: m0`
        display: flex;
        flex-direction: column;
        justify-content: left;
        align-items: center;
        height: 100%;
        width: 100%;
      `,
          },
          'Playground'
        );
      }
      const XO = Kr('root', () => {
          document.getElementById('root')?.appendChild(JSX(uu, null));
        }),
        ZO = Kr('bootstrap', () => Promise.resolve()),
        HO = Kr('mount', () => {
          const e = document.getElementById(
            'single-spa-application:@playground/playground'
          );
          return (
            e && (e.appendChild(JSX(uu, null)), (e.style.flexGrow = '1')),
            Promise.resolve()
          );
        }),
        eS = Kr(
          'unmount',
          () => (
            document
              .getElementById('single-spa-application:@playground/playground')
              ?.replaceChildren(),
            Promise.resolve()
          )
        );
    },
  };
});
