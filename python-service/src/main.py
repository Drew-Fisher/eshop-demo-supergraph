import json

from ariadne import QueryType, MutationType, graphql_sync, make_executable_schema, load_schema_from_path
from ariadne.explorer import ExplorerGraphiQL
from flask import Flask, jsonify, request
from ariadne.contrib.federation import make_federated_schema, FederatedObjectType
import os
from google.cloud import pubsub_v1

query = QueryType()
mutation = MutationType()

type_defs = load_schema_from_path("D:\Code\Work_Code\eshop-demo\python-service\src\schema.graphqls")
product = FederatedObjectType("Product")

@product.reference_resolver
def resolve_product_reference(_, _info, representation):
    return "sku"

@query.field("hello")
def resolve_hello(_, info):
    publisher = pubsub_v1.PublisherClient()
    topic = 'projects/pubsubproducts/topics/eshop_demo_products'
    data = {
        'sku': 'HX500'
    }
    data = json.dumps(data)
    data_str = data
    data = data_str.encode("utf-8")
    future = publisher.publish(topic, data, name="product_created_event")
    future.result()
    return "hit"

@mutation.field("createProduct")
def resolve_create_product(_,info):
    return "hit"

# Use a raw string or double backslashes for the Windows path
schema_path = r"/src/schema.graphqls"
#schema = make_executable_schema(type_defs, query)
schema = make_federated_schema(type_defs)

app = Flask(__name__)

# Retrieve HTML for the GraphiQL.
# If explorer implements logic dependant on current request,
# change the html(None) call to the html(request)
# and move this line to the graphql_explorer function.
explorer_html = ExplorerGraphiQL(explorer_plugin=True).html(None)

@app.route("/graphql", methods=["GET"])
def graphql_explorer():
    # On GET request serve the GraphQL explorer.
    # You don't have to provide the explorer if you don't want to
    # but keep on mind this will not prohibit clients from
    # exploring your API using desktop GraphQL explorer app.
    return explorer_html, 200


@app.route("/graphql", methods=["POST"])
def graphql_server():
    # GraphQL queries are always sent as POST
    data = request.get_json()

    # Note: Passing the request to the context is optional.
    # In Flask, the current request is always accessible as flask.request
    success, result = graphql_sync(
        schema,
        data,
        context_value={"request": request},
        debug=app.debug
    )

    status_code = 200 if success else 400
    return jsonify(result), status_code


if __name__ == "__main__":
    app.run(debug=True)