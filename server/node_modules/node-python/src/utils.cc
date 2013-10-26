
#include <Python.h>
#include <pyerrors.h>

#include "utils.h"

Handle<Value> ThrowPythonException() {
    PyObject *ptype, *pvalue, *ptraceback;
    PyErr_Fetch(&ptype, &pvalue, &ptraceback);
    // maybe useless to protect against bad use of ThrowPythonException ?
    if(!ptype) {
        return ThrowException(
            Exception::Error(String::New("No exception found"))
        );
    }
    // handle exception message
    Local<String> msg;
    if(pvalue && PyObject_TypeCheck(pvalue, &PyString_Type)) {
        msg = String::New(PyString_AsString(pvalue));
    }

    Local<Value> err;
    if(PyErr_GivenExceptionMatches(ptype, PyExc_ReferenceError)) {
        err = Exception::ReferenceError(msg);
    }
    else if(PyErr_GivenExceptionMatches(ptype, PyExc_SyntaxError)) {
        err = Exception::SyntaxError(msg);
    }
    else if(PyErr_GivenExceptionMatches(ptype, PyExc_TypeError)) {
        err = Exception::TypeError(msg);
    }
    else {
        err = Exception::Error(msg);
    }

    // @TODO : handle stacktrace

    Py_XDECREF(ptype);
    Py_XDECREF(pvalue);
    Py_XDECREF(ptraceback);

    return ThrowException(err);
}
