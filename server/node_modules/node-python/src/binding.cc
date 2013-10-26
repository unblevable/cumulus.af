
#include <node.h>
#include <Python.h>

#include "py_object_wrapper.h"
#include "utils.h"

using namespace v8;
using namespace node;
using std::string;

Handle<Value> import(const Arguments& args) {
    HandleScope scope; 
    if(args.Length() < 1 || !args[0]->IsString()) {
        return ThrowException(
            Exception::Error(String::New("I don't know how to import that."))
        );
    }
    PyObject* module_name = PyString_FromString(*String::Utf8Value(args[0]->ToString()));
    PyObject* module = PyImport_Import(module_name);
    if(!module) {
        return ThrowPythonException();
    }
    Py_XDECREF(module_name);

    return scope.Close(PyObjectWrapper::New(module));
}


void init (Handle<Object> exports) {
    HandleScope scope;
    Py_Initialize();

    PyObjectWrapper::Initialize();

    // module.exports.import
    exports->Set(
        String::NewSymbol("import"),
        FunctionTemplate::New(import)->GetFunction()
    );

    // module.exports.PyObject
    exports->Set(
        String::NewSymbol("PyObject"),
        PyObjectWrapper::py_function_template->GetFunction()
    );

}

NODE_MODULE(binding, init)
