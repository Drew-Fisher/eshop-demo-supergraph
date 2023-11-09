from src.main import query


@query.field("test")
def getProductResolver(_, info):
    return "test successful"