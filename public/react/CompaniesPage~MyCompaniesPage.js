(window["webpackJsonpvetrob2c_companies_my_account_0_0_1"] = window["webpackJsonpvetrob2c_companies_my_account_0_0_1"] || []).push([["CompaniesPage~MyCompaniesPage"],{

/***/ "./react/CompaniesPage.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_CompaniesPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./react/components/CompaniesPage/index.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _components_CompaniesPage__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/***/ }),

/***/ "./react/components/CompaniesListItem/CompaniesListItem.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _usr_local_data_service_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../../../usr/local/data/service/node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./react/helpers/index.tsx");
/* harmony import */ var _hooks_useCompaniesQuery__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./react/hooks/useCompaniesQuery.tsx");





var CompaniesListItem = function CompaniesListItem(props) {
  var _a;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(true),
      _useState2 = Object(_usr_local_data_service_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
      isLoading = _useState2[0],
      setIsLoading = _useState2[1];

  var companyCIF = props.companyCIF;
  var companiesQuery = Object(_hooks_useCompaniesQuery__WEBPACK_IMPORTED_MODULE_3__["useCompaniesQuery"])({
    variables: {
      where: "companyCIF=*".concat(companyCIF.replace(/RO/gi, '').trim(), "*")
    }
  });
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    if (companiesQuery.loading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [companiesQuery]);
  if (isLoading) return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, (_a = companiesQuery.data) === null || _a === void 0 ? void 0 : _a.documents.map(function (document, index) {
    var companie = Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["documentToProfile"])(document);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      key: index,
      className: "mb3"
    }, companie.companyName);
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (CompaniesListItem);

/***/ }),

/***/ "./react/components/CompaniesListItem/index.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CompaniesListItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./react/components/CompaniesListItem/CompaniesListItem.tsx");

/* harmony default export */ __webpack_exports__["default"] = (_CompaniesListItem__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./react/components/CompaniesPage/CompaniesPage.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _usr_local_data_service_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../../../usr/local/data/service/node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _usr_local_data_service_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_usr_local_data_service_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _usr_local_data_service_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../../../../usr/local/data/service/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _usr_local_data_service_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../../../../usr/local/data/service/node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vtex_my_account_commons_ContentWrapper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("vtex.my-account-commons/ContentWrapper");
/* harmony import */ var vtex_my_account_commons_ContentWrapper__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(vtex_my_account_commons_ContentWrapper__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var vtex_my_account_commons_BaseLoading__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("vtex.my-account-commons/BaseLoading");
/* harmony import */ var vtex_my_account_commons_BaseLoading__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(vtex_my_account_commons_BaseLoading__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var vtex_my_account_commons_SkeletonBox__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("vtex.my-account-commons/SkeletonBox");
/* harmony import */ var vtex_my_account_commons_SkeletonBox__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(vtex_my_account_commons_SkeletonBox__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var vtex_styleguide_EmptyState__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("vtex.styleguide/EmptyState");
/* harmony import */ var vtex_styleguide_EmptyState__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(vtex_styleguide_EmptyState__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./react/helpers/index.tsx");
/* harmony import */ var _hooks_useCompaniesRelationshipsQuery__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./react/hooks/useCompaniesRelationshipsQuery.tsx");
/* harmony import */ var _CompaniesListItem__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./react/components/CompaniesListItem/index.tsx");




/* eslint-disable no-console */

/* eslint-disable @typescript-eslint/ban-ts-comment */



 // @ts-ignore





var headerConfig = {
  titleId: 'store/my-companies.page'
};

var CompaniesPage = function CompaniesPage() {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(true),
      _useState2 = Object(_usr_local_data_service_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState, 2),
      isLoading = _useState2[0],
      setIsLoading = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(''),
      _useState4 = Object(_usr_local_data_service_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState3, 2),
      email = _useState4[0],
      setEmail = _useState4[1];

  var companiesQuery = Object(_hooks_useCompaniesRelationshipsQuery__WEBPACK_IMPORTED_MODULE_9__["useCompaniesRelationshipsQuery"])({
    variables: {
      where: "clientEmail=".concat(email)
    }
  });
  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    if (companiesQuery.loading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [companiesQuery, email]);
  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    fetch('/no-cache/profileSystem/getProfile').then(function (response) {
      return response.json();
    }).then( /*#__PURE__*/function () {
      var _ref = Object(_usr_local_data_service_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_usr_local_data_service_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(response) {
        return _usr_local_data_service_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (response.IsUserDefined) {
                  setEmail(response.Email);
                }

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  }, [email]);
  if (isLoading) return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(vtex_my_account_commons_BaseLoading__WEBPACK_IMPORTED_MODULE_5___default.a, {
    queryData: companiesQuery,
    headerConfig: headerConfig
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(vtex_my_account_commons_SkeletonBox__WEBPACK_IMPORTED_MODULE_6___default.a, {
    shouldAllowGrowing: true
  }));
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(vtex_my_account_commons_ContentWrapper__WEBPACK_IMPORTED_MODULE_4___default.a, headerConfig, function () {
    var _a, _b;

    return ((_a = companiesQuery.data) === null || _a === void 0 ? void 0 : _a.documents.length) ? (_b = companiesQuery.data) === null || _b === void 0 ? void 0 : _b.documents.map(function (document, index) {
      var companies = Object(_helpers__WEBPACK_IMPORTED_MODULE_8__["documentToProfile"])(document);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_CompaniesListItem__WEBPACK_IMPORTED_MODULE_10__["default"], {
        companyCIF: companies.companyCIF,
        key: index
      });
    }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(vtex_styleguide_EmptyState__WEBPACK_IMPORTED_MODULE_7___default.a, {
      title: "Oops."
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("p", null, "Sorry. We couldn't find any companies associated with your user."));
  });
};

/* harmony default export */ __webpack_exports__["default"] = (CompaniesPage);

/***/ }),

/***/ "./react/components/CompaniesPage/index.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CompaniesPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./react/components/CompaniesPage/CompaniesPage.tsx");

/* harmony default export */ __webpack_exports__["default"] = (_CompaniesPage__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./react/helpers/index.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalizeCustomFields", function() { return normalizeCustomFields; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "documentToProfile", function() { return documentToProfile; });
/* harmony import */ var _usr_local_data_service_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../../../../usr/local/data/service/node_modules/@babel/runtime/helpers/esm/defineProperty.js");

var normalizeCustomFields = function normalizeCustomFields(fields) {
  return fields.reduce(function (prev, curr) {
    var key = curr.key,
        value = curr.value;
    return Object.assign(Object.assign({}, prev), Object(_usr_local_data_service_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])({}, key, value));
  }, {});
};
var documentToProfile = function documentToProfile(document) {
  var fields = document.fields,
      id = document.id;
  var normalizedFields = fields.reduce(function (prev, curr) {
    var key = curr.key,
        value = curr.value;
    return Object.assign(Object.assign({}, prev), Object(_usr_local_data_service_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])({}, key, value));
  }, {});
  var firstName = normalizedFields.firstName,
      lastName = normalizedFields.lastName,
      email = normalizedFields.email;
  var name = [firstName, lastName].filter(function (item) {
    return item;
  }).join(' ');
  return Object.assign({
    id: id,
    name: name,
    email: email
  }, normalizedFields);
};

/***/ }),

/***/ "./react/hooks/useCompaniesQuery.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useCompaniesQuery", function() { return useCompaniesQuery; });
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react-apollo");
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_apollo__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _queries_Companies_graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./react/queries/Companies.graphql");
/* harmony import */ var _queries_Companies_graphql__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_queries_Companies_graphql__WEBPACK_IMPORTED_MODULE_1__);


var useCompaniesQuery = function useCompaniesQuery(options) {
  return Object(react_apollo__WEBPACK_IMPORTED_MODULE_0__["useQuery"])(_queries_Companies_graphql__WEBPACK_IMPORTED_MODULE_1___default.a, options);
};

/***/ }),

/***/ "./react/hooks/useCompaniesRelationshipsQuery.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useCompaniesRelationshipsQuery", function() { return useCompaniesRelationshipsQuery; });
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react-apollo");
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_apollo__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _queries_CompaniesRelationships_graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./react/queries/CompaniesRelationships.graphql");
/* harmony import */ var _queries_CompaniesRelationships_graphql__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_queries_CompaniesRelationships_graphql__WEBPACK_IMPORTED_MODULE_1__);


var useCompaniesRelationshipsQuery = function useCompaniesRelationshipsQuery(options) {
  return Object(react_apollo__WEBPACK_IMPORTED_MODULE_0__["useQuery"])(_queries_CompaniesRelationships_graphql__WEBPACK_IMPORTED_MODULE_1___default.a, options);
};

/***/ }),

/***/ "./react/queries/Companies.graphql":
/***/ (function(module, exports) {


    var doc = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Companies"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]}],"directives":[{"kind":"Directive","name":{"kind":"Name","value":"context"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"scope"},"value":{"kind":"StringValue","value":"private","block":false}},{"kind":"Argument","name":{"kind":"Name","value":"sender"},"value":{"kind":"StringValue","value":"vetrob2c.companies-my-account@0.0.1","block":false}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"acronym"},"value":{"kind":"StringValue","value":"MC","block":false}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"fields"},"value":{"kind":"ListValue","values":[{"kind":"StringValue","value":"companyName","block":false},{"kind":"StringValue","value":"companyCIF","block":false}]}},{"kind":"Argument","name":{"kind":"Name","value":"schema"},"value":{"kind":"StringValue","value":"healthmp-caregivers","block":false}}],"directives":[{"kind":"Directive","name":{"kind":"Name","value":"context"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"provider"},"value":{"kind":"StringValue","value":"vtex.store-graphql","block":false}}]},{"kind":"Directive","name":{"kind":"Name","value":"runtimeMeta"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hash"},"value":{"kind":"StringValue","value":"c23973f1992c92bb31d26d37b5323866c804e1682e7428e313ba34992be94aec","block":false}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cacheId"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"fields"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"value"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"__typename"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"__typename"},"arguments":[],"directives":[]}]}}]}}],"loc":{"start":0,"end":448}};
    doc.loc.source = {"body":"query Companies($where: String) @context(scope: \"private\", sender: \"vetrob2c.companies-my-account@0.0.1\") {\n  documents(acronym: \"MC\", where: $where, fields: [\"companyName\", \"companyCIF\"], schema: \"healthmp-caregivers\") @context(provider: \"vtex.store-graphql\") @runtimeMeta(hash: \"c23973f1992c92bb31d26d37b5323866c804e1682e7428e313ba34992be94aec\") {\n    cacheId\n    id\n    fields {\n      key\n      value\n      __typename\n    }\n    __typename\n  }\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  

    // Collect any fragment/type references from a node, adding them to the refs Set
    function collectFragmentReferences(node, refs) {
      if (node.kind === "FragmentSpread") {
        refs.add(node.name.value);
      } else if (node.kind === "VariableDefinition") {
        var type = node.type;
        if (type.kind === "NamedType") {
          refs.add(type.name.value);
        }
      }

      if (node.selectionSet) {
        node.selectionSet.selections.forEach(function(selection) {
          collectFragmentReferences(selection, refs);
        });
      }

      if (node.variableDefinitions) {
        node.variableDefinitions.forEach(function(def) {
          collectFragmentReferences(def, refs);
        });
      }

      if (node.definitions) {
        node.definitions.forEach(function(def) {
          collectFragmentReferences(def, refs);
        });
      }
    }

    var definitionRefs = {};
    (function extractReferences() {
      doc.definitions.forEach(function(def) {
        if (def.name) {
          var refs = new Set();
          collectFragmentReferences(def, refs);
          definitionRefs[def.name.value] = refs;
        }
      });
    })();

    function findOperation(doc, name) {
      for (var i = 0; i < doc.definitions.length; i++) {
        var element = doc.definitions[i];
        if (element.name && element.name.value == name) {
          return element;
        }
      }
    }

    function oneQuery(doc, operationName) {
      // Copy the DocumentNode, but clear out the definitions
      var newDoc = {
        kind: doc.kind,
        definitions: [findOperation(doc, operationName)]
      };
      if (doc.hasOwnProperty("loc")) {
        newDoc.loc = doc.loc;
      }

      // Now, for the operation we're running, find any fragments referenced by
      // it or the fragments it references
      var opRefs = definitionRefs[operationName] || new Set();
      var allRefs = new Set();
      var newRefs = new Set();

      // IE 11 doesn't support "new Set(iterable)", so we add the members of opRefs to newRefs one by one
      opRefs.forEach(function(refName) {
        newRefs.add(refName);
      });

      while (newRefs.size > 0) {
        var prevRefs = newRefs;
        newRefs = new Set();

        prevRefs.forEach(function(refName) {
          if (!allRefs.has(refName)) {
            allRefs.add(refName);
            var childRefs = definitionRefs[refName] || new Set();
            childRefs.forEach(function(childRef) {
              newRefs.add(childRef);
            });
          }
        });
      }

      allRefs.forEach(function(refName) {
        var op = findOperation(doc, refName);
        if (op) {
          newDoc.definitions.push(op);
        }
      });

      return newDoc;
    }

    module.exports = doc;
    
        module.exports["Companies"] = oneQuery(doc, "Companies");
        


/***/ }),

/***/ "./react/queries/CompaniesRelationships.graphql":
/***/ (function(module, exports) {


    var doc = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CompaniesRelationships"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]}],"directives":[{"kind":"Directive","name":{"kind":"Name","value":"context"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"scope"},"value":{"kind":"StringValue","value":"private","block":false}},{"kind":"Argument","name":{"kind":"Name","value":"sender"},"value":{"kind":"StringValue","value":"vetrob2c.companies-my-account@0.0.1","block":false}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"acronym"},"value":{"kind":"StringValue","value":"RC","block":false}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"fields"},"value":{"kind":"ListValue","values":[{"kind":"StringValue","value":"clientEmail","block":false},{"kind":"StringValue","value":"companyCIF","block":false}]}},{"kind":"Argument","name":{"kind":"Name","value":"schema"},"value":{"kind":"StringValue","value":"healthmp-caregivers","block":false}}],"directives":[{"kind":"Directive","name":{"kind":"Name","value":"context"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"provider"},"value":{"kind":"StringValue","value":"vtex.store-graphql","block":false}}]},{"kind":"Directive","name":{"kind":"Name","value":"runtimeMeta"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hash"},"value":{"kind":"StringValue","value":"aa41257d8809932cf3488b556d74b3f2027472f383b2a933139050ae39f1a8c6","block":false}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cacheId"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"fields"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"value"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"__typename"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"__typename"},"arguments":[],"directives":[]}]}}]}}],"loc":{"start":0,"end":461}};
    doc.loc.source = {"body":"query CompaniesRelationships($where: String) @context(scope: \"private\", sender: \"vetrob2c.companies-my-account@0.0.1\") {\n  documents(acronym: \"RC\", where: $where, fields: [\"clientEmail\", \"companyCIF\"], schema: \"healthmp-caregivers\") @context(provider: \"vtex.store-graphql\") @runtimeMeta(hash: \"aa41257d8809932cf3488b556d74b3f2027472f383b2a933139050ae39f1a8c6\") {\n    cacheId\n    id\n    fields {\n      key\n      value\n      __typename\n    }\n    __typename\n  }\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  

    // Collect any fragment/type references from a node, adding them to the refs Set
    function collectFragmentReferences(node, refs) {
      if (node.kind === "FragmentSpread") {
        refs.add(node.name.value);
      } else if (node.kind === "VariableDefinition") {
        var type = node.type;
        if (type.kind === "NamedType") {
          refs.add(type.name.value);
        }
      }

      if (node.selectionSet) {
        node.selectionSet.selections.forEach(function(selection) {
          collectFragmentReferences(selection, refs);
        });
      }

      if (node.variableDefinitions) {
        node.variableDefinitions.forEach(function(def) {
          collectFragmentReferences(def, refs);
        });
      }

      if (node.definitions) {
        node.definitions.forEach(function(def) {
          collectFragmentReferences(def, refs);
        });
      }
    }

    var definitionRefs = {};
    (function extractReferences() {
      doc.definitions.forEach(function(def) {
        if (def.name) {
          var refs = new Set();
          collectFragmentReferences(def, refs);
          definitionRefs[def.name.value] = refs;
        }
      });
    })();

    function findOperation(doc, name) {
      for (var i = 0; i < doc.definitions.length; i++) {
        var element = doc.definitions[i];
        if (element.name && element.name.value == name) {
          return element;
        }
      }
    }

    function oneQuery(doc, operationName) {
      // Copy the DocumentNode, but clear out the definitions
      var newDoc = {
        kind: doc.kind,
        definitions: [findOperation(doc, operationName)]
      };
      if (doc.hasOwnProperty("loc")) {
        newDoc.loc = doc.loc;
      }

      // Now, for the operation we're running, find any fragments referenced by
      // it or the fragments it references
      var opRefs = definitionRefs[operationName] || new Set();
      var allRefs = new Set();
      var newRefs = new Set();

      // IE 11 doesn't support "new Set(iterable)", so we add the members of opRefs to newRefs one by one
      opRefs.forEach(function(refName) {
        newRefs.add(refName);
      });

      while (newRefs.size > 0) {
        var prevRefs = newRefs;
        newRefs = new Set();

        prevRefs.forEach(function(refName) {
          if (!allRefs.has(refName)) {
            allRefs.add(refName);
            var childRefs = definitionRefs[refName] || new Set();
            childRefs.forEach(function(childRef) {
              newRefs.add(childRef);
            });
          }
        });
      }

      allRefs.forEach(function(refName) {
        var op = findOperation(doc, refName);
        if (op) {
          newDoc.definitions.push(op);
        }
      });

      return newDoc;
    }

    module.exports = doc;
    
        module.exports["CompaniesRelationships"] = oneQuery(doc, "CompaniesRelationships");
        


/***/ })

}]);
//# sourceMappingURL=CompaniesPage~MyCompaniesPage.js.map