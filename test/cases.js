export default [
  {
    '-Name': 'Just to test the dummy start rule',
    '-Rule': 'dummyStartRule',
    'Input': 'http://services.odata.org/'
  },
  {
    '-Name': 'URI with IPv4 address, path and trailing slash',
    '-Rule': 'odataUri',
    'Input': 'http://127.0.0.1:8080/MyService/'
  },
  {
    '-Name': 'URI with IPv6 address, path and trailing slash',
    '-Rule': 'odataUri',
    'Input': 'https://[2001:db8:85a3:8d3:1319:8a2e:370:7348]:8080/MyService/'
  },
  {
    '-Name': 'URI with IPvFuture address, path and trailing slash',
    '-Rule': 'odataUri',
    'Input': 'https://[v7.0]/MyService/'
  },
  {
    '-Name': 'URI without schema separator',
    '-Rule': 'odataUri',
    '-FailAt': '4',
    'Input': 'http//My.Org/'
  },
  {
    '-Name': 'Resource Path - Entity Set',
    '-Rule': 'resourcePath',
    'Input': 'Categories'
  },
  {
    '-Name': 'Resource Path - Entity',
    '-Rule': 'resourcePath',
    'Input': 'Categories(11)'
  },
  {
    '-Name': 'Resource Path - Entity',
    '-Rule': 'resourcePath',
    'Input': 'Categories(ID=1)'
  },
  {
    '-Name': 'Resource Path - Entity',
    '-Rule': 'resourcePath',
    'Input': 'Categories(ID=1,Size=5)'
  },
  {
    '-Name': 'Identifier',
    '-Rule': 'odataIdentifier',
    'Input': 'TheQuickBrownFoxSays42'
  },
  {
    '-Name': 'Identifier with leading underscores',
    '-Rule': 'odataIdentifier',
    'Input': '__ID'
  },
  {
    '-Name': 'Identifier: no starting digit',
    '-Rule': 'odataIdentifier',
    '-FailAt': '0',
    'Input': '0time'
  },
  {
    '-Name': 'Identifier: no dots within',
    '-Rule': 'odataIdentifier',
    '-FailAt': '2',
    'Input': 'No.Dot'
  },
  {
    '-Name': 'Entity Set',
    '-Rule': 'resourcePath',
    'Input': 'Products'
  },
  {
    '-Name': '2 URL Components - service root URL',
    '-Rule': 'odataUri',
    'Input': 'http://services.odata.org/OData/OData.svc/'
  },
  {
    '-Name': '2 URL Components - service root directly at server root',
    '-Rule': 'odataUri',
    'Input': 'http://My.Org:80/'
  },
  {
    '-Name': '2 URL Components - resource path',
    '-Rule': 'resourcePath',
    'Input': 'Categories(1)/Products'
  },
  {
    '-Name': '2 URL Components - resource path',
    '-Rule': 'resourcePath',
    'Input': 'Categories(1)/Products'
  },
  {
    '-Name': '2 URL Components - key with alias',
    '-Rule': 'resourcePath',
    'Input': 'Categories(KeyAlias=1)'
  },
  {
    '-Name': '2 URL Components - query options',
    '-Rule': 'queryOptions',
    'Input': '$top=2&$orderby=Name'
  },
  {
    '-Name': '2 URL Components - resource path and query options',
    '-Rule': 'odataRelativeUri',
    'Input': 'Categories(1)/Products?$top=2&$orderby=Name'
  },
  {
    '-Name': '2 URL Components - single quotes',
    '-Rule': 'odataRelativeUri',
    'Input': "Customers('O''Neil')"
  },
  {
    '-Name': '2 URL Components - single quotes',
    '-Rule': 'odataRelativeUri',
    'Input': 'Customers(%27O%27%27Neil%27)'
  },
  {
    '-Name': '2 URL Components - unquoted single quotes',
    '-Rule': 'odataRelativeUri',
    '-FailAt': '15',
    'Input': "Customers('O%27Neil')"
  },
  {
    '-Name': '2 URL Components - parentheses',
    '-Rule': 'odataRelativeUri',
    'Input': 'Customers%28%27O%27%27Neil%27%29'
  },
  {
    '-Name': '2 URL Components - encoded forward slash',
    '-Rule': 'odataUri',
    'Input': "http://host/service/Categories('Smartphone%2FTablet')"
  },
  {
    '-Name': '2 URL Components - unencoded forward slash',
    '-Rule': 'odataRelativeUri',
    '-FailAt': '22',
    'Input': "Categories('Smartphone/Tablet')"
  },
  {
    '-Name': '4.1 - Metadata URL',
    '-Rule': 'odataUri',
    'Input': 'http://services.odata.org/OData/OData.svc/$metadata'
  },
  {
    '-Name': '4.1 - Metadata URL - allowed but reserved for future use',
    '-Rule': 'odataUri',
    'Input': 'http://services.odata.org/OData/OData.svc/$metadata?$format=json'
  },
  {
    '-Name': '4.1 - Metadata URL - allowed',
    '-Rule': 'odataUri',
    'Input': 'http://services.odata.org/OData/OData.svc/$metadata?$format=text/html'
  },
  {
    '-Name': '4.2 - Batch URL',
    '-Rule': 'odataUri',
    'Input': 'http://services.odata.org/OData/OData.svc/$batch'
  },
  {
    '-Name': '4.3 Addressing entities - entity set',
    '-Rule': 'entitySetName',
    'Input': 'Products'
  },
  {
    '-Name': '4.3 Addressing entities - entity set',
    '-Rule': 'odataRelativeUri',
    'Input': 'Products'
  },
  {
    '-Name': '4.3 Addressing entities - no trailing dot',
    '-Rule': 'odataRelativeUri',
    '-FailAt': '8',
    'Input': "Products.('foo')"
  },
  {
    '-Name': '4.3 Addressing entities - no leading dot',
    '-Rule': 'odataRelativeUri',
    '-FailAt': '0',
    'Input': ".Products('foo')"
  },
  {
    '-Name': '4.3 Addressing entities - function call',
    '-Rule': 'odataRelativeUri',
    'Input': 'ProductsByCategoryId(categoryId=2)'
  },
  {
    '-Name': '4.3 Addressing entities - function call with alias',
    '-Rule': 'odataRelativeUri',
    'Input': 'ProductsByCategoryId(categoryId=@cat)?@cat=2'
  },
  {
    '-Name': '4.3 Addressing entities - function call with query parameter',
    '-Rule': 'odataRelativeUri',
    'Input': 'ProductsByCategoryId(categoryId=2)'
  },
  {
    '-Name': '4.3 Addressing entities - function parameter',
    '-Rule': 'functionParameter',
    'Input': "color='red'"
  },
  {
    '-Name': '4.3 Addressing entities - top-level function call',
    '-Rule': 'odataRelativeUri',
    'Input': "ProductsByColor(color='red')"
  },
  {
    '-Name': '4.3 Addressing entities - bound function call',
    '-Rule': 'odataRelativeUri',
    'Input': "Categories(1)/Model.ProductsByColor(color='red')"
  },
  {
    '-Name': '4.3 Addressing entities - single entity (short)',
    '-Rule': 'resourcePath',
    'Input': 'Categories(1)'
  },
  {
    '-Name': '4.3 Addressing entities - single entity (short)',
    '-Rule': 'odataRelativeUri',
    'Input': 'Customers(1)'
  },
  {
    '-Name': '4.3 Addressing entities - single entity (long)',
    '-Rule': 'resourcePath',
    'Input': 'Categories(ID=1)'
  },
  {
    '-Name': '4.3 Addressing entities - single entity (string)',
    '-Rule': 'resourcePath',
    'Input': "Categories('Tablet')"
  },
  {
    '-Name': '4.3 Addressing entities - single entity (string)',
    '-Rule': 'resourcePath',
    'Input': "Categories('7''''%20Tablet')"
  },
  {
    '-Name': '4.3 Addressing entities - single entity (string)',
    '-Rule': 'resourcePath',
    'Input': 'Categories%28%27Tablet%27%29'
  },
  {
    '-Name': '4.3 Addressing entities - single entity (string)',
    '-Rule': 'resourcePath',
    'Input': "Categories('Tablet%2FSlate')"
  },
  {
    '-Name': '4.3 Addressing entities - single entity (wrong)',
    '-Rule': 'resourcePath',
    '-FailAt': '18',
    'Input': "Categories('Tablet/Slate')"
  },
  {
    '-Name': '4.3 Addressing entities - single entity (string)',
    '-Rule': 'resourcePath',
    'Input': "Categories('Tablet%20%28small%29')"
  },
  {
    '-Name': '4.3 Addressing entities - single entity (string)',
    '-Rule': 'resourcePath',
    'Input': "Categories('Tablet%20(small)')"
  },
  {
    '-Name': '4.3 Addressing entities - single entity (string)',
    '-Rule': 'resourcePath',
    'Input': "Categories('Tablet%20)small(')"
  },
  {
    '-Name': '4.3 Addressing entities - single entity (wrong)',
    '-Rule': 'resourcePath',
    '-FailAt': '19',
    'Input': 'Categories(ID=wrong)'
  },
  {
    '-Name': '4.3 Addressing entities - single entity (multi-part key)',
    '-Rule': 'resourcePath',
    'Input': "OrderItems(OrderID=1,ItemID='a')"
  },
  {
    '-Name': '4.3 Addressing entities - single entity (wrong multi-part key)',
    '-Rule': 'resourcePath',
    '-FailAt': '20',
    'Input': "OrderItems(OrderID=1;ItemID='a')"
  },
  {
    '-Name': '4.3 Addressing entities - bound operation on entity set',
    '-Rule': 'resourcePath',
    'Input': 'Products/Model.MostExpensive()'
  },
  {
    '-Name': '4.3 Addressing entities - follow navigation property',
    '-Rule': 'resourcePath',
    'Input': 'Products(1)/Supplier'
  },
  {
    '-Name': '4.3 Addressing entities - follow navigation property and call function',
    '-Rule': 'odataRelativeUri',
    'Input': 'Categories(1)/Products/Model.AllOrders()'
  },
  {
    '-Name': '4.3 Addressing entities - follow navigation property and call function',
    '-Rule': 'odataRelativeUri',
    'Input': 'Categories(1)/Products/Model.MostExpensive()'
  },
  {
    '-Name': '4.3 Addressing entities - singleton entities',
    '-Rule': 'resourcePath',
    'Input': 'SingletonEntity'
  },
  {
    '-Name': '4.3 Addressing entities - single navigation property in complex type',
    '-Rule': 'resourcePath',
    'Input': 'Customers(1)/Address/Country'
  },
  {
    '-Name': '4.3 Addressing entities - collection navigation property in complex type',
    '-Rule': 'resourcePath',
    'Input': 'Customers(1)/Address/Products'
  },
  {
    '-Name': '4.3.1 Canonical URL',
    '-Rule': 'odataRelativeUri',
    'Input': 'Categories(1)/Products(1)'
  },
  {
    '-Name': '4.3.4 $entity with OData URL',
    '-Rule': 'odataRelativeUri',
    'Input': '$entity?$id=http://host/path'
  },
  {
    '-Name': '4.3.4 $entity with URN',
    '-Rule': 'odataRelativeUri',
    'Input': '$entity?$id=urn:some:id'
  },
  {
    '-Name': '4.3.4 $entity with OData URL, $select and $expand fails without type-cast',
    '-Rule': 'odataRelativeUri',
    '-FailAt': '48',
    'Input': "$entity?$id=http://myservice/Customers('ALFKI')&$select=CompanyName,ContactName&$expand=Orders"
  },
  {
    '-Name': '4.3.4 $entity with OData URL, $select and $expand',
    '-Rule': 'odataRelativeUri',
    'Input': "$entity/Model.Customer?$id=http://myservice/Customers('ALFKI')&$select=CompanyName,ContactName&$expand=Orders"
  },
  {
    '-Name': '4.3.4 $entity without $id fails',
    '-Rule': 'odataRelativeUri',
    '-FailAt': '20',
    'Input': '$entity?$format=json'
  },
  {
    '-Name': '4.4 Addressing Links between Entities',
    '-Rule': 'odataRelativeUri',
    'Input': 'Categories(1)/Products/$ref'
  },
  {
    '-Name': '4.4 Addressing Links between Entities',
    '-Rule': 'odataRelativeUri',
    'Input': 'Categories(1)/Products/$ref?$id=Products(0)'
  },
  {
    '-Name': '4.4 Addressing Links between Entities',
    '-Rule': 'odataRelativeUri',
    'Input': 'Products(1)/Category/$ref'
  },
  {
    '-Name': '4.4 Addressing Links between Entities - count',
    '-Rule': 'odataRelativeUri',
    '-FailAt': '27',
    'Input': 'Categories(1)/Products/$ref/$count'
  },
  {
    '-Name': '4.4 Addressing Links between Entities',
    '-Rule': 'odataRelativeUri',
    'Input': 'Categories(1)/Products(2)/$ref'
  },
  {
    '-Name': '4.4 Addressing Links between Entities',
    '-Rule': 'odataRelativeUri',
    '-FailAt': '30',
    'Input': 'Categories(1)/Products(2)/$ref/$count'
  },
  {
    '-Name': '4.5.1 Call unbound action via action import',
    '-Rule': 'odataRelativeUri',
    'Input': 'Activation'
  },
  {
    '-Name': '4.5.1 Call bound action',
    '-Rule': 'odataRelativeUri',
    'Input': 'LeaveRequests(4)/Model.Rejection'
  },
  {
    '-Name': '4.5.1 Call action at service root',
    '-Rule': 'odataRelativeUri',
    '-FailAt': '5',
    'Input': 'Model.Rejection'
  },
  {
    '-Name': '4.5.2 Call function import',
    '-Rule': 'odataRelativeUri',
    'Input': 'TheBestProduct()'
  },
  {
    '-Name': '4.5.2 Call function import - no parentheses',
    '-Rule': 'odataRelativeUri',
    '-FailAt': '14',
    'Input': 'TheBestProduct'
  },
  {
    '-Name': '4.5.2 Call function import - inline parameter',
    '-Rule': 'odataRelativeUri',
    'Input': 'TheBestProduct(Size=3)'
  },
  {
    '-Name': '4.5.2 Call function import - only at service root',
    '-Rule': 'odataRelativeUri',
    '-FailAt': '25',
    'Input': 'Categories/TheBestProduct()'
  },
  {
    '-Name': '4.5.2 Call complex function import',
    '-Rule': 'odataRelativeUri',
    'Input': 'TheMostPopularAddress()'
  },
  {
    '-Name': '4.5.2 Call complex collection function import',
    '-Rule': 'odataRelativeUri',
    'Input': 'TheMostPopularAddresses()'
  },
  {
    '-Name': '4.5.2 Call primitive function import',
    '-Rule': 'odataRelativeUri',
    'Input': 'TheMostPopularName()'
  },
  {
    '-Name': '4.5.2 Call primitive function import',
    '-Rule': 'odataRelativeUri',
    'Input': 'TheMostPopularName()/$value'
  },
  {
    '-Name': '4.5.2 Call primitive collection function import',
    '-Rule': 'odataRelativeUri',
    'Input': 'TheMostPopularNames()'
  },
  {
    '-Name': '4.5.2 Call bound complex function',
    '-Rule': 'odataRelativeUri',
    'Input': 'Customers/Model.MostPopularAddress()'
  },
  {
    '-Name': '4.5.2 Call bound complex collection function',
    '-Rule': 'odataRelativeUri',
    'Input': 'Customers/Model.MostPopularAddresses()'
  },
  {
    '-Name': '4.5.2 Call bound complex collection function',
    '-Rule': 'odataRelativeUri',
    'Input': 'Customers/Model.MostPopularAddresses()/$count'
  },
  {
    '-Name': '4.5.2 Call bound complex collection function - multiple',
    '-Rule': 'odataRelativeUri',
    'Input': 'Customers/Model.MostPopularAddresses()/Model.MostPopularNames()'
  },
  {
    '-Name': '4.5.2 Call bound primitive function',
    '-Rule': 'odataRelativeUri',
    'Input': 'Customers/Model.MostPopularName()'
  },
  {
    '-Name': '4.5.2 Call bound primitive function',
    '-Rule': 'odataRelativeUri',
    'Input': 'Customers/Model.MostPopularName()/$value'
  },
  {
    '-Name': '4.5.2 Call bound primitive collection function',
    '-Rule': 'odataRelativeUri',
    'Input': 'Customers/Model.MostPopularNames()'
  },
  {
    '-Name': '4.5.2 Call bound primitive collection function',
    '-Rule': 'odataRelativeUri',
    'Input': 'Customers/Model.MostPopularNames()/$count'
  },
  {
    '-Name': '4.6 Addressing a Property - primitive',
    '-Rule': 'odataRelativeUri',
    'Input': 'Categories(1)/ID'
  },
  {
    '-Name': '4.6 Addressing a Property - complex',
    '-Rule': 'odataRelativeUri',
    'Input': 'Categories(1)/Address'
  },
  {
    '-Name': '4.6 Addressing a Property - complex path',
    '-Rule': 'odataRelativeUri',
    'Input': 'Categories(1)/Address/Street'
  },
  {
    '-Name': '4.6 Addressing a Property - complex path with type cast',
    '-Rule': 'odataRelativeUri',
    'Input': 'Categories(1)/Address/Model.AddressWithLocation/Location'
  },
  {
    '-Name': '4.6 Addressing a Property - stream',
    '-Rule': 'odataRelativeUri',
    'Input': 'Categories(1)/Thumbnail'
  },
  {
    '-Name': '4.6 Addressing a Property - collection of primitive',
    '-Rule': 'odataRelativeUri',
    'Input': 'Suppliers(1)/EmailAddresses'
  },
  {
    '-Name': '4.6 Addressing a Property - collection of complex',
    '-Rule': 'odataRelativeUri',
    'Input': 'Suppliers(1)/Addresses'
  },
  {
    '-Name': '4.7 Addressing a Property Value',
    '-Rule': 'odataRelativeUri',
    'Input': 'Categories(1)/ID/$value'
  },
  {
    '-Name': '4.7 Addressing a Property Value - with $format',
    '-Rule': 'odataRelativeUri',
    'Input': 'Categories(1)/ID/$value?$format=json'
  },
  {
    '-Name': '4.7 Addressing a Property Value - illegal suffix',
    '-Rule': 'odataRelativeUri',
    '-FailAt': '23',
    'Input': 'Categories(1)/ID/$value/foo'
  },
  {
    '-Name': '4.7 Addressing a Property Value - complex',
    '-Rule': 'odataRelativeUri',
    '-FailAt': '22',
    'Input': 'Categories(1)/Address/$value'
  },
  {
    '-Name': '4.7 Addressing a Property Value - property of complex',
    '-Rule': 'odataRelativeUri',
    'Input': 'Categories(1)/Address/Street/$value'
  },
  {
    '-Name': '4.7 Named Stream Property - $value does not make sense here',
    '-Rule': 'odataRelativeUri',
    '-FailAt': '24',
    'Input': 'Categories(1)/Thumbnail/$value'
  },
  {
    '-Name': '4.8 Addressing entities - entity set with $count',
    '-Rule': 'odataRelativeUri',
    'Input': 'Products/$count'
  },
  {
    '-Name': '4.8 Addressing entities - $count not last segment',
    '-Rule': 'odataRelativeUri',
    '-FailAt': '15',
    'Input': 'Products/$count/foo'
  },
  {
    '-Name': '4.8 Addressing entities - entity set navigation with $count',
    '-Rule': 'odataRelativeUri',
    'Input': 'Products(1)/Items/$count'
  },
  {
    '-Name': '4.8 Addressing entities - collection property with $count',
    '-Rule': 'odataRelativeUri',
    'Input': 'Products(1)/Addresses/$count'
  },
  {
    '-Name': '4.8 Addressing entities - collection property with $count',
    '-Rule': 'odataRelativeUri',
    'Input': 'Products(1)/Sizes/$count'
  },
  {
    '-Name': '4.8 Addressing the Count - in $filter with navigation',
    '-Rule': 'filter',
    'Input': '$filter=Products/$count gt 0'
  },
  {
    '-Name': '4.8 Addressing the Count - in $filter with complex collection',
    '-Rule': 'filter',
    'Input': '$filter=Addresses/$count gt 0'
  },
  {
    '-Name': '4.8 Addressing the Count - in $filter with primitive collection',
    '-Rule': 'filter',
    'Input': '$filter=Sizes/$count gt 0'
  },
  {
    '-Name': '4.8 Addressing the Count - collection navigation property with $count in $orderby',
    '-Rule': 'orderby',
    'Input': '$orderby=Products/$count'
  },
  {
    '-Name': '4.8 Addressing the Count - collection property with $count in $orderby',
    '-Rule': 'orderby',
    'Input': '$orderby=Addresses/$count'
  },
  {
    '-Name': '4.8 Addressing the Count - collection property with $count in $orderby',
    '-Rule': 'orderby',
    'Input': '$orderby=Sizes/$count'
  },
  {
    '-Name': '4.9 Inheritance - set of subtypes',
    '-Rule': 'odataRelativeUri',
    'Input': 'Products/Model.BestSellingProduct'
  },
  {
    '-Name': '4.9 Inheritance - set of subtypes, then key access',
    '-Rule': 'odataRelativeUri',
    'Input': 'Products/Model.BestSellingProduct(1)'
  },
  {
    '-Name': '4.9 Inheritance - key access, then cast to subtype',
    '-Rule': 'odataRelativeUri',
    'Input': 'Products(1)/Model.BestSellingProduct'
  },
  {
    '-Name': '4.9 Inheritance - key access, then cast to subtype - only once',
    '-Rule': 'odataRelativeUri',
    '-FailAt': '61',
    'Input': 'Products(1)/Model.BestSellingProduct/Model.BestSellingProduct'
  },
  {
    '-Name': '4.9 Inheritance - $expand',
    '-Rule': 'odataRelativeUri',
    'Input': 'Categories?$expand=Products/Model.BestSellingProduct'
  },
  {
    '-Name': '4.9 Inheritance - $expand',
    '-Rule': 'odataRelativeUri',
    'Input': 'Products?$expand=Model.BestSellingProduct/Sales'
  },
  {
    '-Name': '4.9 Inheritance - $expand',
    '-Rule': 'odataRelativeUri',
    'Input': 'Categories?$expand=Products/Model.BestSellingProduct($select=Name)'
  },
  {
    '-Name': '4.9 Inheritance - $expand',
    '-Rule': 'odataRelativeUri',
    'Input': "Categories?$expand=Products($filter=startswith(Name,'P'))"
  },
  {
    '-Name': '4.10 Addressing a Media Resource',
    '-Rule': 'odataRelativeUri',
    'Input': 'Categories(1)/$value'
  },
  {
    '-Name': '5 $ is reserved',
    '-Rule': 'filter',
    'Input': '$filter=true'
  },
  {
    '-Name': '5.1.1 Filter',
    '-Rule': 'filter',
    'Input': '$filter=true'
  },
  {
    '-Name': '5.1.1 Filter: no spaces',
    '-Rule': 'filter',
    '-FailAt': '7',
    'Input': '$filter =true'
  },
  {
    '-Name': '5.1.1 Filter: no spaces',
    '-Rule': 'filter',
    '-FailAt': '9',
    'Input': '$filter= true'
  },
  {
    '-Name': '5.1.1 Filter',
    '-Rule': 'filter',
    'Input': '$filter=Completed'
  },
  {
    '-Name': '5.1.1 Filter - member expressions',
    '-Rule': 'firstMemberExpr',
    'Input': 'Product'
  },
  {
    '-Name': '5.1.1 Filter - member expressions - single navigation',
    '-Rule': 'firstMemberExpr',
    'Input': 'Product/Supplier'
  },
  {
    '-Name': '5.1.1 Filter - member expressions - single-complex',
    '-Rule': 'firstMemberExpr',
    'Input': 'Product/Supplier/Address'
  },
  {
    '-Name': '5.1.1 Filter - member expressions - single-complex-primitive',
    '-Rule': 'firstMemberExpr',
    'Input': 'Product/Supplier/Address/Street'
  },
  {
    '-Name': '5.1.1 Filter - member expressions - single-complex-single',
    '-Rule': 'firstMemberExpr',
    'Input': 'Product/Supplier/Address/Country'
  },
  {
    '-Name': '5.1.1 Filter - member expressions - single-complex-collection',
    '-Rule': 'firstMemberExpr',
    'Input': 'Product/Supplier/Address/Products'
  },
  {
    '-Name': '5.1.1 Filter - member expressions - stream',
    '-Rule': 'firstMemberExpr',
    'Input': 'Product/Thumbnail'
  },
  {
    '-Name': '5.1.1 Filter - member expressions - stream',
    '-Rule': 'firstMemberExpr',
    'Input': 'Address/Thumbnail'
  },
  {
    '-Name': '5.1.1 Filter - member expressions - single-colComplex',
    '-Rule': 'firstMemberExpr',
    'Input': 'Product/Supplier/Addresses'
  },
  {
    '-Name': '5.1.1 Filter - member expressions - single-primitive',
    '-Rule': 'firstMemberExpr',
    'Input': 'Product/Supplier/CompanyName'
  },
  {
    '-Name': '5.1.1 Filter - member expressions - single-colPrimitive',
    '-Rule': 'firstMemberExpr',
    'Input': 'Product/Supplier/EmailAddresses'
  },
  {
    '-Name': '5.1.1 Filter - member expressions - collection navigation',
    '-Rule': 'firstMemberExpr',
    'Input': 'Supplier/Products'
  },
  {
    '-Name': '5.1.1 Filter - member expressions - collection navigation',
    '-Rule': 'firstMemberExpr',
    'Input': 'Products'
  },
  {
    '-Name': '5.1.1 Filter - member expressions - collection navigation - count',
    '-Rule': 'firstMemberExpr',
    'Input': 'Products/$count'
  },
  {
    '-Name': '5.1.1.1.1 Equals',
    '-Rule': 'boolCommonExpr',
    'Input': 'true eq false'
  },
  {
    '-Name': '5.1.1.1.1 Equals - Property',
    '-Rule': 'firstMemberExpr',
    'Input': 'Size'
  },
  {
    '-Name': '5.1.1.1.1 Equals',
    '-Rule': 'boolCommonExpr',
    'Input': 'Size eq true'
  },
  {
    '-Name': '5.1.1.1.1 Equals - Literal',
    '-Rule': 'primitiveLiteral',
    'Input': '4.0'
  },
  {
    '-Name': '5.1.1.1.1 Equals - Literal',
    '-Rule': 'primitiveLiteral',
    'Input': "'Huge'"
  },
  {
    '-Name': '5.1.1.1.1 Equals',
    '-Rule': 'boolCommonExpr',
    'Input': 'Size eq 4.0'
  },
  {
    '-Name': '5.1.1.1.1 Equals',
    '-Rule': 'boolCommonExpr',
    'Input': "Street eq 'Hugo'"
  },
  {
    '-Name': '5.1.1.1.1 Equals - property path argument',
    '-Rule': 'firstMemberExpr',
    'Input': 'Address/Street'
  },
  {
    '-Name': '5.1.1.1.1 Equals - property path argument',
    '-Rule': 'firstMemberExpr',
    'Input': 'Address/Model.AddressWithLocation/Location'
  },
  {
    '-Name': '5.1.1.1.1 Equals',
    '-Rule': 'boolCommonExpr',
    'Input': "Address/Street eq 'Hugo'"
  },
  {
    '-Name': '5.1.1.1.2 Not Equals',
    '-Rule': 'boolCommonExpr',
    'Input': "Name ne 'Milk'"
  },
  {
    '-Name': '5.1.1.1.2 Not Equals',
    '-Rule': 'boolCommonExpr',
    'Input': 'true ne false'
  },
  {
    '-Name': '5.1.1.1.3 Greater Than',
    '-Rule': 'boolCommonExpr',
    'Input': "Name gt 'Milk'"
  },
  {
    '-Name': '5.1.1.1.4 Greater Than or Equal',
    '-Rule': 'boolCommonExpr',
    'Input': "Name ge 'Milk'"
  },
  {
    '-Name': '5.1.1.1.5 Less Than',
    '-Rule': 'boolCommonExpr',
    'Input': "Name lt 'Milk'"
  },
  {
    '-Name': '5.1.1.1.6 Less Than or Equal',
    '-Rule': 'boolCommonExpr',
    'Input': "Name le 'Milk'"
  },
  {
    '-Name': '5.1.1.1.7 Logical And',
    '-Rule': 'boolCommonExpr',
    'Input': 'true and false'
  },
  {
    '-Name': '5.1.1.1.8 Logical Or',
    '-Rule': 'boolCommonExpr',
    'Input': 'true or false'
  },
  {
    '-Name': '5.1.1.1.9 Logical Negation',
    '-Rule': 'notExpr',
    'Input': 'not false'
  },
  {
    '-Name': '5.1.1.1.10 Logical Operator Examples',
    '-Rule': 'boolCommonExpr',
    'Input': "Name eq 'Milk'"
  },
  {
    '-Name': '5.1.1.1.10 Logical Operator Examples',
    '-Rule': 'boolCommonExpr',
    'Input': "Supplier/Name eq 'Milk'"
  },
  {
    '-Name': '5.1.1.1.10 Logical Operator Examples',
    '-Rule': 'boolCommonExpr',
    'Input': "Name eq 'Milk' and Price lt 2.55"
  },
  {
    '-Name': '5.1.1.1.10 Logical Operator Examples',
    '-Rule': 'boolCommonExpr',
    'Input': "Name eq 'Milk' or Price lt 2.55"
  },
  {
    '-Name': '5.1.1.1.10 Logical Operator Examples',
    '-Rule': 'boolCommonExpr',
    'Input': "not endswith(Name,'ilk')"
  },
  {
    '-Name': '5.1.1.2.1 Addition',
    '-Rule': 'commonExpr',
    'Input': 'Price add 2.45'
  },
  {
    '-Name': '5.1.1.2.1 Addition',
    '-Rule': 'commonExpr',
    'Input': '(Price add 2.45) mod 2'
  },
  {
    '-Name': '5.1.1.2.2 Subtraction',
    '-Rule': 'commonExpr',
    'Input': 'Price sub 0.55'
  },
  {
    '-Name': '5.1.1.2.3 Multiplication',
    '-Rule': 'commonExpr',
    'Input': 'Price mul 2'
  },
  {
    '-Name': '5.1.1.2.4 Division',
    '-Rule': 'commonExpr',
    'Input': 'Price div 2'
  },
  {
    '-Name': '5.1.1.2.5 Modulo',
    '-Rule': 'commonExpr',
    'Input': 'Price mod 5'
  },
  {
    '-Name': '5.1.1.2.5 Negate',
    '-Rule': 'commonExpr',
    'Input': '-Price'
  },
  {
    '-Name': '5.1.1.2.6 Arithmetic Operator Examples',
    '-Rule': 'boolCommonExpr',
    'Input': 'Price add 2.45 eq 5.00'
  },
  {
    '-Name': '5.1.1.2.6 Arithmetic Operator Examples',
    '-Rule': 'boolCommonExpr',
    'Input': 'Price sub 0.55 eq 2.00'
  },
  {
    '-Name': '5.1.1.2.6 Arithmetic Operator Examples',
    '-Rule': 'boolCommonExpr',
    'Input': 'Price mul 2.0 eq 5.10'
  },
  {
    '-Name': '5.1.1.2.6 Arithmetic Operator Examples',
    '-Rule': 'boolCommonExpr',
    'Input': 'Price div 2.55 eq 1'
  },
  {
    '-Name': '5.1.1.2.6 Arithmetic Operator Examples',
    '-Rule': 'boolCommonExpr',
    'Input': 'Rating mod 5 eq 0'
  },
  {
    '-Name': '5.1.1.3 Parenthesis',
    '-Rule': 'commonExpr',
    'Input': '(true)'
  },
  {
    '-Name': '5.1.1.3 Parenthesis',
    '-Rule': 'boolCommonExpr',
    'Input': '( true )'
  },
  {
    '-Name': '5.1.1.3 Parenthesis',
    '-Rule': 'boolCommonExpr',
    'Input': "(Name eq 'Milk')"
  },
  {
    '-Name': '5.1.1.3 Parenthesis',
    '-Rule': 'boolCommonExpr',
    'Input': '(false)'
  },
  {
    '-Name': '5.1.1.3 Parenthesis',
    '-Rule': 'commonExpr',
    'Input': '(4 add 5) mod (4 sub 1)'
  },
  {
    '-Name': '5.1.1.3 Parenthesis',
    '-Rule': 'boolcommonExpr',
    'Input': '(4 add 5) mod (4 sub 1) eq 0'
  },
  {
    '-Name': '5.1.1.4.1 contains',
    '-Rule': 'boolCommonExpr',
    'Input': "contains(CompanyName,'lfreds')"
  },
  {
    '-Name': '5.1.1.4.2 endswith',
    '-Rule': 'boolCommonExpr',
    'Input': "endswith(CompanyName,'Futterkiste')"
  },
  {
    '-Name': '5.1.1.4.3 startswith',
    '-Rule': 'boolCommonExpr',
    'Input': "startswith(CompanyName,'Futterkiste')"
  },
  {
    '-Name': '5.1.1.4.3 startswith',
    '-Rule': 'boolCommonExpr',
    'Input': "startswith(Supplier/Name,'Futterkiste')"
  },
  {
    '-Name': '5.1.1.4.4 length',
    '-Rule': 'boolCommonExpr',
    'Input': 'length(CompanyName) eq 19'
  },
  {
    '-Name': '5.1.1.4.5 indexof',
    '-Rule': 'boolCommonExpr',
    'Input': "indexof(CompanyName,'lfreds') eq 1"
  },
  {
    '-Name': '5.1.1.4.6 substring',
    '-Rule': 'commonExpr',
    'Input': 'substring(CompanyName, 5)'
  },
  {
    '-Name': '5.1.1.4.6 substring with length',
    '-Rule': 'commonExpr',
    'Input': 'substring(CompanyName,5,2)'
  },
  {
    '-Name': '5.1.1.4.7 tolower',
    '-Rule': 'commonExpr',
    'Input': 'tolower(CompanyName)'
  },
  {
    '-Name': '5.1.1.4.8 toupper',
    '-Rule': 'commonExpr',
    'Input': 'toupper(CompanyName)'
  },
  {
    '-Name': '5.1.1.4.9 trim',
    '-Rule': 'commonExpr',
    'Input': 'trim(CompanyName)'
  },
  {
    '-Name': '5.1.1.4.10 concat',
    '-Rule': 'commonExpr',
    'Input': 'concat(CompanyName, Name)'
  },
  {
    '-Name': '5.1.1.4.10 concat',
    '-Rule': 'commonExpr',
    'Input': "concat(concat(Street,'-'),City)"
  },
  {
    '-Name': '5.1.1.4.11 year',
    '-Rule': 'commonExpr',
    'Input': 'year(BirthDate)'
  },
  {
    '-Name': '5.1.1.4.12',
    '-Rule': 'commonExpr',
    'Input': 'month(BirthDate)'
  },
  {
    '-Name': '5.1.1.4.13',
    '-Rule': 'commonExpr',
    'Input': 'day(BirthDate)'
  },
  {
    '-Name': '5.1.1.4.14',
    '-Rule': 'commonExpr',
    'Input': 'hour(BirthDate)'
  },
  {
    '-Name': '5.1.1.4.15',
    '-Rule': 'commonExpr',
    'Input': 'minute(BirthDate)'
  },
  {
    '-Name': '5.1.1.4.16',
    '-Rule': 'commonExpr',
    'Input': 'second(BirthDate)'
  },
  {
    '-Name': '5.1.1.4.17',
    '-Rule': 'commonExpr',
    'Input': 'fractionalseconds(LifeTime)'
  },
  {
    '-Name': '5.1.1.4.18',
    '-Rule': 'commonExpr',
    'Input': 'totalseconds(LifeTime)'
  },
  {
    '-Name': '5.1.1.4.19',
    '-Rule': 'commonExpr',
    'Input': 'date(LifeTime)'
  },
  {
    '-Name': '5.1.1.4.20',
    '-Rule': 'commonExpr',
    'Input': 'time(ReleaseDate)'
  },
  {
    '-Name': '5.1.1.4.21 - totaloffsetminutes',
    '-Rule': 'commonExpr',
    'Input': 'totaloffsetminutes(ReleaseDate)'
  },
  {
    '-Name': '5.1.1.4.22',
    '-Rule': 'commonExpr',
    'Input': 'now()'
  },
  {
    '-Name': '5.1.1.4.23',
    '-Rule': 'commonExpr',
    'Input': 'maxdatetime()'
  },
  {
    '-Name': '5.1.1.4.24',
    '-Rule': 'commonExpr',
    'Input': 'mindatetime()'
  },
  {
    '-Name': '5.1.1.4.25',
    '-Rule': 'commonExpr',
    'Input': 'round(Price)'
  },
  {
    '-Name': '5.1.1.4.26',
    '-Rule': 'commonExpr',
    'Input': 'floor(Price)'
  },
  {
    '-Name': '5.1.1.4.27',
    '-Rule': 'commonExpr',
    'Input': 'ceiling(Price)'
  },
  {
    '-Name': '5.1.1.4.28 isof(1)',
    '-Rule': 'isofExpr',
    'Input': 'isof(Model.Customer)'
  },
  {
    '-Name': '5.1.1.4.28 isof(2)',
    '-Rule': 'isofExpr',
    'Input': 'isof(Category,Model.Customer)'
  },
  {
    '-Name': '5.1.1.4.28 isof(2)',
    '-Rule': 'isofExpr',
    'Input': 'isof(Location,Edm.GeographyPoint)'
  },
  {
    '-Name': '5.1.1.4.29 cast(1)',
    '-Rule': 'commonExpr',
    'Input': 'cast(Model.Customer)'
  },
  {
    '-Name': '5.1.1.4.29 cast(2)',
    '-Rule': 'commonExpr',
    'Input': 'cast(Category,Model.Customer)'
  },
  {
    '-Name': '5.1.1.4.29 cast(3)',
    '-Rule': 'commonExpr',
    'Input': 'cast(Category,Edm.Boolean)'
  },
  {
    '-Name': '5.1.1.4.30 geo.distance',
    '-Rule': 'commonExpr',
    'Input': 'geo.distance(Supplier/Location,Product/Location)'
  },
  {
    '-Name': '5.1.1.4.31 geo.intersects',
    '-Rule': 'boolCommonExpr',
    'Input': 'geo.intersects(Supplier/SalesArea,Product/Location)'
  },
  {
    '-Name': '5.1.1.4.32 geo.length',
    '-Rule': 'commonExpr',
    'Input': 'geo.length(Line)'
  },
  {
    '-Name': '5.1.1.4.32 geo.length',
    '-Rule': 'commonExpr',
    'Input': "geo.length(geography'SRID=0;LineString(142.1 64.1,3.14 2.78)')"
  },
  {
    '-Name': '5.1.1.5 any()',
    '-Rule': 'anyExpr',
    'Input': 'any()'
  },
  {
    '-Name': '5.1.1.5 any()',
    '-Rule': 'anyExpr',
    'Input': 'any( )'
  },
  {
    '-Name': '5.1.1.5 any()',
    '-Rule': 'anyExpr',
    'Input': 'any(lambda:true)'
  },
  {
    '-Name': '5.1.1.5 any()',
    '-Rule': 'anyExpr',
    'Input': 'any( lambda : true )'
  },
  {
    '-Name': '5.1.1.5 any()',
    '-Rule': 'commonExpr',
    'Input': 'Products/any(lambda:true)'
  },
  {
    '-Name': '5.1.1.5 any() - requires a path prefix',
    '-Rule': 'boolCommonExpr',
    '-FailAt': '3',
    'Input': 'any()'
  },
  {
    '-Name': '5.1.1.5 any()',
    '-Rule': 'commonExpr',
    'Input': 'Supplier/Products/any(lambda:true)'
  },
  {
    '-Name': '5.1.1.5 any()',
    '-Rule': 'firstMemberExpr',
    'Input': '$it/Completed'
  },
  {
    '-Name': '5.1.1.5 any()',
    '-Rule': 'firstMemberExpr',
    'Input': 'lambda/Completed'
  },
  {
    '-Name': '5.1.1.5 any()',
    '-Rule': 'commonExpr',
    'Input': 'Products/any(lambda:lambda/Completed)'
  },
  {
    '-Name': '5.1.1.5 any()',
    '-Rule': 'commonExpr',
    'Input': 'Products/any(lambda:$it/Completed)'
  },
  {
    '-Name': '5.1.1.5 lambdaPredicateExpr',
    '-Rule': 'boolCommonExpr',
    'Input': "$it eq 'Hugo'"
  },
  {
    '-Name': '5.1.1.5 lambdaPredicateExpr',
    '-Rule': 'boolCommonExpr',
    'Input': 'lambda/Name eq $it/Name'
  },
  {
    '-Name': '5.1.1.5 all()',
    '-Rule': 'boolCommonExpr',
    'Input': 'Products/all(lambda:true)'
  },
  {
    '-Name': '5.1.1.5 all() - requires path prefix',
    '-Rule': 'boolCommonExpr',
    '-FailAt': '3',
    'Input': 'all(lambda:true)'
  },
  {
    '-Name': '5.1.1.5 all() - must contain a lambda expression',
    '-Rule': 'boolCommonExpr',
    '-FailAt': '13',
    'Input': 'Products/all()'
  },
  {
    '-Name': '5.1.1.5 all()',
    '-Rule': 'commonExpr',
    'Input': 'Products/all(lambda:true)'
  },
  {
    '-Name': '5.1.1.5 all()',
    '-Rule': 'commonExpr',
    'Input': 'EmailAddresses/all(lambda:true)'
  },
  {
    '-Name': '5.1.1.6.1 primitive literal',
    '-Rule': 'filter',
    'Input': '$filter=ReleaseDate gt 2013-05-24'
  },
  {
    '-Name': '5.1.1.6.4 $it',
    '-Rule': 'filter',
    'Input': "$filter=endswith($it,'.com')"
  },
  // {
  //   '-Name': '5.1.1.6.4 $it with alias for entity reference',
  //   '-Rule': 'queryOptions',
  //   'Input': '$filter=$it eq @ref&@ref={"odata.id":"http://host/service/ZqV5t"}'
  // },
  // {
  //   '-Name': '5.1.1.6.4 $it with entity reference',
  //   '-Rule': 'queryOptions',
  //   'Input': '$filter=$it eq {"odata.ref":"http://host/service/ZqV5t"}'
  // },
  {
    '-Name': '5.1.1.7 Path expressions',
    '-Rule': 'commonExpr',
    'Input': 'Items'
  },
  {
    '-Name': '5.1.1.7 Path expressions - key access after set navigation',
    '-Rule': 'commonExpr',
    'Input': 'Items(1)'
  },
  {
    '-Name': '5.1.1.8 aliases',
    '-Rule': 'queryOptions',
    'Input': "$filter=contains(Title,@word)&@word='Black'"
  },
  {
    '-Name': '5.1.1.8 aliases',
    '-Rule': 'queryOptions',
    'Input': "$filter=Title eq @title&@title='Wizard%20of%20Oz'"
  },
  {
    '-Name': '5.1.2 Expand - single navigation property',
    '-Rule': 'expand',
    'Input': '$expand=Items'
  },
  {
    '-Name': '5.1.2 Expand - single navigation property',
    '-Rule': 'expand',
    'Input': '$expand=Items/$ref'
  },
  {
    '-Name': '5.1.2 Expand - multiple navigation properties',
    '-Rule': 'expand',
    'Input': '$expand=Customer,Items'
  },
  {
    '-Name': '5.1.2 Expand - multiple navigation properties',
    '-Rule': 'expand',
    'Input': '$expand=Customer/$ref,Items'
  },
  {
    '-Name': '5.1.2 Expand - multiple navigation properties, nested',
    '-Rule': 'expand',
    'Input': '$expand=Customer,Items($expand=Product)'
  },
  {
    '-Name': '5.1.2 Expand - multiple navigation properties, nested',
    '-Rule': 'expand',
    'Input': '$expand=Customer($levels=4)'
  },
  {
    '-Name': '5.1.2 Expand - multiple navigation properties, nested',
    '-Rule': 'expand',
    'Input': '$expand=Customer,Items($expand=Product/$ref)'
  },
  {
    '-Name': '5.1.2 Expand - no $level after $ref',
    '-Rule': 'expand',
    '-FailAt': '22',
    'Input': '$expand=Customer/$ref($levels=4)'
  },
  {
    '-Name': '5.1.2 Expand - no $select after $ref',
    '-Rule': 'expand',
    '-FailAt': '22',
    'Input': '$expand=Customer/$ref($select=Name)'
  },
  {
    '-Name': '5.1.2 Expand - no $expand after $ref',
    '-Rule': 'expand',
    '-FailAt': '28',
    'Input': '$expand=Customer,Items/$ref($expand=Product)'
  },
  {
    '-Name': '5.1.2 Expand - $count',
    '-Rule': 'expand',
    'Input': '$expand=Items($count=true)'
  },
  {
    '-Name': '5.1.2 Expand - $count',
    '-Rule': 'expand',
    'Input': '$expand=Items/$count'
  },
  {
    '-Name': '5.1.2 Expand - $count',
    '-Rule': 'expand',
    'Input': "$expand=Items/$count($filter=Name eq 'Hugo')"
  },
  {
    '-Name': '5.1.2 Expand - $count',
    '-Rule': 'expand',
    'Input': '$expand=Items/$count($search=Hugo)'
  },
  {
    '-Name': '5.1.2 Expand - no $count after $count',
    '-Rule': 'expand',
    '-FailAt': '21',
    'Input': '$expand=Items/$count($count=true)'
  },
  {
    '-Name': '5.1.2 Expand - multiple nested options',
    '-Rule': 'expand',
    'Input': '$expand=Items($select=Quantity;$expand=Product($select=Name,Price))'
  },
  {
    '-Name': '5.1.2 Expand - navigation property in complex type',
    '-Rule': 'expand',
    'Input': '$expand=Address/Country'
  },
  {
    '-Name': '5.1.2 Expand - navigation property in collection of complex type',
    '-Rule': 'expand',
    'Input': '$expand=Addresses/Country'
  },
  {
    '-Name': '5.1.2 Expand - levels',
    '-Rule': 'expand',
    'Input': '$expand=Category($levels=4),Category($levels=max)'
  },
  {
    '-Name': '5.1.2 Expand - star',
    '-Rule': 'expand',
    'Input': '$expand=*,*/$ref,*($levels=2),Category'
  },
  {
    '-Name': '5.1.3 Select - simple',
    '-Rule': 'select',
    'Input': '$select=Rating,ReleaseDate'
  },
  {
    '-Name': '5.1.3 Select - with star',
    '-Rule': 'select',
    'Input': '$select=*'
  },
  {
    '-Name': '5.1.3 Select - with property of complex property',
    '-Rule': 'select',
    'Input': '$select=Address/Street'
  },
  {
    '-Name': '5.1.3 Select - with property of complex property',
    '-Rule': 'select',
    'Input': '$select=Address/Country'
  },
  {
    '-Name': '5.1.3 Select - with cast',
    '-Rule': 'select',
    'Input': '$select=Address/Model.AddressWithLocation'
  },
  {
    '-Name': '5.1.3 Select - with cast and property of complex property',
    '-Rule': 'select',
    'Input': '$select=Address/Model.AddressWithLocation/Location'
  },
  {
    '-Name': '5.1.3 Select - with expand',
    '-Rule': 'queryOptions',
    'Input': '$expand=Category($select=Name)'
  },
  {
    '-Name': '5.1.3 Select - qualifiedEntityTypeName',
    '-Rule': 'select',
    'Input': '$select=Model.PreferredSupplier/Name'
  },
  {
    '-Name': '5.1.3 Select - actions by namespace',
    '-Rule': 'select',
    'Input': '$select=Model.ActionName,Model.MostPopularName,Model.*'
  },
  {
    '-Name': '5.1.3 Select - actions and functions with signature',
    '-Rule': 'select',
    'Input': '$select=Model.ActionName,Model.MostPopularName(Location,Kind)'
  },
  {
    '-Name': '5.1.3 Select - tricky',
    '-Rule': 'select',
    'Input': '$select=Namespace.PreferredSupplier/AccountRepresentative,Address/Street'
  },
  {
    '-Name': '5.1.4 OrderBy',
    '-Rule': 'orderby',
    'Input': '$orderby=Name'
  },
  {
    '-Name': '5.1.4 OrderBy asc',
    '-Rule': 'orderby',
    'Input': '$orderby=Name asc'
  },
  {
    '-Name': '5.1.4 OrderBy mixed',
    '-Rule': 'orderby',
    'Input': '$orderby=Name asc,Rating,ReleaseDate desc'
  },
  {
    '-Name': '5.1.5 Top and Skip',
    '-Rule': 'queryOptions',
    'Input': '$top=5&$skip=10'
  },
  {
    '-Name': '5.1.6 Inlinecount',
    '-Rule': 'queryOptions',
    'Input': '$count=true'
  },
  {
    '-Name': '5.1.6 Inlinecount',
    '-Rule': 'queryOptions',
    'Input': '$count=false'
  },
  {
    '-Name': '5.1.6 Inlinecount',
    '-Rule': 'queryOptions',
    '-FailAt': '6',
    'Input': '$count'
  },
  {
    '-Name': '5.1.7 Search - simple term',
    '-Rule': 'queryOptions',
    'Input': '$search=blue'
  },
  {
    '-Name': '5.1.7 Search - simple phrase',
    '-Rule': 'queryOptions',
    'Input': '$search="blue%20green"'
  },
  {
    '-Name': '5.1.7 Search - simple phrase',
    '-Rule': 'queryOptions',
    'Input': '$search="blue%20green%22'
  },
  {
    '-Name': '5.1.7 Search - phrase with escaped double-quote',
    '-Rule': 'queryOptions',
    'Input': '$search="blue\\"green"'
  },
  {
    '-Name': '5.1.7 Search - phrase with escaped backslash',
    '-Rule': 'queryOptions',
    'Input': '$search="blue\\\\green"'
  },
  {
    '-Name': '5.1.7 Search - phrase with unescaped double-quote',
    '-Rule': 'queryOptions',
    '-FailAt': '14',
    'Input': '$search="blue"green"'
  },
  {
    '-Name': '5.1.7 Search - phrase with unescaped double-quote',
    '-Rule': 'queryOptions',
    '-FailAt': '16',
    'Input': '$search="blue%22green"'
  },
  {
    '-Name': '5.1.7 Search - implicit AND',
    '-Rule': 'queryOptions',
    'Input': '$search=blue green'
  },
  {
    '-Name': '5.1.7 Search - AND',
    '-Rule': 'queryOptions',
    'Input': '$search=blue AND green'
  },
  {
    '-Name': '5.1.7 Search - OR',
    '-Rule': 'queryOptions',
    'Input': '$search=blue OR green'
  },
  {
    '-Name': '5.1.7 Search - NOT',
    '-Rule': 'queryOptions',
    'Input': '$search=blue NOT green'
  },
  {
    '-Name': '5.1.7 Search - only NOT',
    '-Rule': 'queryOptions',
    'Input': '$search=NOT blue'
  },
  {
    '-Name': '5.1.7 Search - multiple',
    '-Rule': 'queryOptions',
    'Input': '$search=foo AND bar OR foo AND baz OR that AND bar OR that AND baz'
  },
  {
    '-Name': '5.1.7 Search - multiple',
    '-Rule': 'queryOptions',
    'Input': '$search=(foo OR that) AND (bar OR baz)'
  },
  {
    '-Name': '5.1.7 Search - grouping',
    '-Rule': 'queryOptions',
    'Input': '$search=foo AND (bar OR baz)'
  },
  {
    '-Name': '5.1.7 Search - grouping',
    '-Rule': 'queryOptions',
    'Input': '$search=(foo AND bar) OR baz'
  },
  {
    '-Name': '5.1.7 Search - grouping',
    '-Rule': 'queryOptions',
    'Input': '$search=(NOT foo) OR baz'
  },
  {
    '-Name': '5.1.7 Search - grouping',
    '-Rule': 'queryOptions',
    'Input': '$search=(NOT foo)'
  },
  {
    '-Name': '5.1.7 Search - on entity set',
    '-Rule': 'odataUri',
    'Input': 'http://serviceRoot/Products?$search=blue'
  },
  {
    '-Name': '5.1.7 Search - on entity container',
    '-Rule': 'odataUri',
    'Input': 'http://serviceRoot/Model.Container/$all?$search=blue'
  },
  {
    '-Name': '5.1.7 Search - on service',
    '-Rule': 'odataUri',
    'Input': 'http://serviceRoot/$all?$search=blue'
  },
  {
    '-Name': '5.1.8 Format',
    '-Rule': 'queryOptions',
    'Input': '$format=json&$format=atom&$format=xml&$format=text/html'
  },
  {
    '-Name': '5.1.8 Format - is case-insensitive',
    '-Rule': 'queryOptions',
    'Input': '$format=JSON&$format=Atom&$format=XML&$format=text/html'
  },
  {
    '-Name': '5.1.8 Format - media type',
    '-Rule': 'queryOptions',
    'Input': '$format=text/html'
  },
  {
    '-Name': 'Next Link',
    '-Rule': 'skiptoken',
    'Input': '$skiptoken=Start@Next_Chunk:From?=Here!'
  },
  {
    '-Name': 'Next Link: no Ampersand',
    '-Rule': 'skiptoken',
    '-FailAt': '14',
    'Input': '$skiptoken=Not&this'
  },
  // {
  //   '-Name': '5.2 Custom Query Option',
  //   '-Rule': 'customQueryOption',
  //   'Input': 'search=O%27Neil'
  // },
  // {
  //   '-Name': '5.2 Custom Query Option',
  //   '-Rule': 'customQueryOption',
  //   'Input': "!deltatoken='201208210403'"
  // },
  // {
  //   '-Name': '5.2 Custom Query Option',
  //   '-Rule': 'customQueryOption',
  //   'Input': '!special'
  // },
  // {
  //   '-Name': '5.2 Custom Query Option',
  //   '-Rule': 'queryOptions',
  //   'Input': 'search=O%27Neil&!special'
  // },
  // {
  //   '-Name': '5.2 Custom Query Option',
  //   '-Rule': 'queryOptions',
  //   'Input': '$orderby=Name&!deltatoken=0412312321'
  // },
  {
    '-Name': 'complex parameter value - no properties',
    '-Rule': 'complexInUri',
    'Input': '{}'
  },
  {
    '-Name': 'function with complex parameter - no properties',
    '-Rule': 'odataRelativeUri',
    'Input': 'ProductsByComplex(complex=@c)?@c={}'
  },
  {
    '-Name': 'function with complex parameter - one property',
    '-Rule': 'odataRelativeUri',
    'Input': 'ProductsByComplex(complex=@c)?@c={"Name":"Value"}'
  },
  {
    '-Name': 'function with complex parameter - one property',
    '-Rule': 'odataRelativeUri',
    'Input': 'ProductsByComplex(complex=@c)?@c={"odata.type":"Model.Customer","Name":"Value"}'
  },
  {
    '-Name': 'function with complex parameter - three properties',
    '-Rule': 'odataRelativeUri',
    'Input': 'ProductsByComplex(complex=@c)?@c={"Name":false,"Price":3.14e0,"Rating":null}'
  },
  {
    '-Name': 'function with collection of primitive - zero',
    '-Rule': 'odataRelativeUri',
    'Input': 'ProductsByColor(colors=@c)?@c=[]'
  },
  {
    '-Name': 'function with collection of primitive - one',
    '-Rule': 'odataRelativeUri',
    'Input': 'ProductsByColor(colors=@c)?@c=["red"]'
  },
  {
    '-Name': 'function with collection of primitive - two',
    '-Rule': 'odataRelativeUri',
    'Input': 'ProductsByColor(colors=@c)?@c=["red","green"]'
  },
  {
    '-Name': 'function with complex parameter - complex and collection properties',
    '-Rule': 'odataRelativeUri',
    'Input': 'ProductsByComplex(complex=@c)?@c={"Names":["Fred","George"],"Address":{"Street":"MyWay"}}'
  },
  {
    '-Name': 'function with rootExpr',
    '-Rule': 'odataRelativeUri',
    'Input': 'ProductsByCustomer(customer=@c)?@c=$root/Customers(1)'
  },
  {
    '-Name': 'function with rootExpr - single navigation',
    '-Rule': 'odataRelativeUri',
    'Input': 'ProductsByCustomer(customer=@c)?@c=$root/Customers(1)/Model.VipCustomer/AccountRepresentative'
  },
  {
    '-Name': 'function with rootExpr - array',
    '-Rule': 'odataRelativeUri',
    'Input': 'ProductsByCustomer(customer=@c)?@c=[$root/Customers(1),$root/Customers(2)]'
  },
  {
    '-Name': 'function with rootExpr - complex with single navigation',
    '-Rule': 'odataRelativeUri',
    'Input': "ProductsByCustomer(customer=@c)?@c={\"Country\":$root/Countries('DE')}"
  },
  {
    '-Name': 'function with rootExpr - complex with collection navigation',
    '-Rule': 'odataRelativeUri',
    'Input': 'ProductsByCustomer(customer=@c)?@c={"Orders":[$root/Orders(1)]}'
  },
  {
    '-Name': 'Enumeration value in URI',
    '-Rule': 'enum',
    'Input': "Sales.Pattern'Yellow'"
  },
  {
    '-Name': 'Enumeration value in URI - multiple flag values',
    '-Rule': 'enum',
    'Input': "Sales.Pattern'Solid,Yellow'"
  },
  {
    '-Name': 'Enumeration value - in filter',
    '-Rule': 'filter',
    'Input': "$filter=style eq Sales.Pattern'Yellow'"
  },
  {
    '-Name': 'Enumeration value - in filter with has',
    '-Rule': 'filter',
    'Input': "$filter=style has Sales.Pattern'Yellow'"
  },
  {
    '-Name': 'Enumeration value - undefined value as numeric constant',
    '-Rule': 'filter',
    'Input': "$filter=style has Sales.Pattern'32'"
  },
  {
    '-Name': 'Enumeration value - undefined value as numeric constant',
    '-Rule': 'odataRelativeUri',
    'Input': "Products?$filter=style eq Sales.Pattern'Yellow,32'"
  },
  {
    '-Name': 'Enumeration value - undefined value as numeric constant',
    '-Rule': 'odataRelativeUri',
    'Input': 'Products?$filter=style eq cast(eyeColor,Sales.Pattern)'
  },
  {
    '-Name': 'Functions in commonExpr',
    '-Rule': 'commonExpr',
    'Input': 'Model.Available()'
  },
  {
    '-Name': 'Functions in commonExpr',
    '-Rule': 'commonExpr',
    '-FailAt': '15',
    'Input': 'Model.Available'
  },
  {
    '-Name': 'Functions in commonExpr - directly call function',
    '-Rule': 'commonExpr',
    'Input': 'Model.MostPopularName()'
  },
  {
    '-Name': 'Functions in commonExpr - after collection navigation',
    '-Rule': 'commonExpr',
    'Input': 'Products/Model.Available()'
  },
  {
    '-Name': 'Functions in commonExpr - composed functions',
    '-Rule': 'commonExpr',
    'Input': 'Products/Model.BestProduct()/Model.MostPopularName()'
  },
  {
    '-Name': 'Functions in commonExpr - singleNavigation',
    '-Rule': 'commonExpr',
    'Input': 'Products/Model.BestProduct()/Name'
  },
  {
    '-Name': 'Functions in commonExpr - singleNavigation',
    '-Rule': 'commonExpr',
    'Input': 'Products/Model.BestProduct()/Model.BestSellingProduct/Name'
  },
  {
    '-Name': 'Functions in commonExpr - singleNavigation',
    '-Rule': 'commonExpr',
    'Input': 'Products/Model.BestProduct()/Name/Model.Available()'
  },
  {
    '-Name': 'Functions in commonExpr - singleNavigation',
    '-Rule': 'commonExpr',
    'Input': 'Products/Model.BestProduct()/Address'
  },
  {
    '-Name': 'Functions in commonExpr - singleNavigation',
    '-Rule': 'commonExpr',
    'Input': 'Products/Model.BestProduct()/Address/Street'
  },
  {
    '-Name': 'Functions in commonExpr - singleNavigation',
    '-Rule': 'commonExpr',
    'Input': 'Products/Model.BestProduct()/Addresses'
  },
  {
    '-Name': 'Functions in commonExpr - singleNavigation',
    '-Rule': 'commonExpr',
    'Input': 'Products/Model.BestProduct()/Addresses/Model.MostPopularName()'
  },
  {
    '-Name': 'Functions in commonExpr - singleNavigation',
    '-Rule': 'commonExpr',
    'Input': 'Products/Model.BestProduct()/EmailAddresses'
  },
  {
    '-Name': 'Functions in commonExpr - stream property',
    '-Rule': 'commonExpr',
    'Input': 'Products/Model.BestProduct()/Thumbnail'
  },
  {
    '-Name': 'Functions in commonExpr - singleNavigation with any',
    '-Rule': 'commonExpr',
    'Input': 'Products/Model.BestProduct()/EmailAddresses/any()'
  },
  {
    '-Name': 'Functions in commonExpr - singleNavigation with all',
    '-Rule': 'commonExpr',
    'Input': 'Products/Model.BestProduct()/EmailAddresses/all(lambda:true)'
  },
  {
    '-Name': 'Functions in commonExpr - collectionNavigation',
    '-Rule': 'commonExpr',
    'Input': "Products/Model.ProductsByColor(color='green')/Model.MostPopularName()"
  },
  {
    '-Name': 'Functions in commonExpr - collectionNavigation',
    '-Rule': 'commonExpr',
    'Input': "Products/Model.ProductsByColor(color='green')/Model.BestSellingProduct/Model.MostPopularName()"
  },
  {
    '-Name': 'Functions in commonExpr - collectionNavigation',
    '-Rule': 'commonExpr',
    'Input': 'Products/Model.ProductsByColor(color=@color)/Model.BestSellingProduct/Model.MostPopularName()'
  },
  {
    '-Name': 'Functions in commonExpr - collectionNavigation with all',
    '-Rule': 'commonExpr',
    'Input': 'Products/Model.ProductsByColor()/all(lambda:true)'
  },
  {
    '-Name': 'Functions in commonExpr - complexPath',
    '-Rule': 'commonExpr',
    'Input': 'Items/Model.MostPopularAddress()/Street'
  },
  {
    '-Name': 'Functions in commonExpr - complexPath',
    '-Rule': 'commonExpr',
    'Input': 'Items/Model.MostPopularAddress()/Address'
  },
  {
    '-Name': 'Functions in commonExpr - complexPath',
    '-Rule': 'commonExpr',
    'Input': 'Items/Model.MostPopularAddress()/Address/Model.Available()'
  },
  {
    '-Name': 'Functions in commonExpr - collectionPath',
    '-Rule': 'commonExpr',
    'Input': 'Items/Model.MostPopularAddresses()/$count'
  },
  {
    '-Name': 'Functions in commonExpr - collectionPath',
    '-Rule': 'commonExpr',
    'Input': 'Items/Model.MostPopularAddresses()/Model.MostPopularName()'
  },
  {
    '-Name': 'Functions in commonExpr - collectionPath',
    '-Rule': 'commonExpr',
    'Input': 'Items/Model.MostPopularNames()/$count'
  },
  {
    '-Name': 'Functions in commonExpr - collectionPath',
    '-Rule': 'commonExpr',
    'Input': 'Items/Model.MostPopularNames()/Model.MostPopularName()'
  },
  {
    '-Name': 'Functions in commonExpr - singlePath',
    '-Rule': 'commonExpr',
    'Input': 'Items/Model.MostPopularName()/Model.MostPopularName()'
  },
  {
    '-Name': 'Functions in commonExpr - collection parameter in JSON',
    '-Rule': 'commonExpr',
    'Input': 'Products/Model.ProductsByColor(colors=["red","green","blue"])'
  },
  {
    '-Name': 'Functions in commonExpr - collection parameter in JSON with whitespace',
    '-Rule': 'commonExpr',
    'Input': 'Products/Model.ProductsByColor(colors=[ "red", "green" , "blue" ])'
  },
  {
    '-Name': 'Functions in commonExpr - collection parameter in JSON with whitespace',
    '-Rule': 'commonExpr',
    'Input': 'Products/Model.ProductsByColor(colors=%5B%20"red",%20"green"%20,"blue"%20%5D)'
  },
  {
    '-Name': 'Functions in commonExpr - complex JSON parameter',
    '-Rule': 'commonExpr',
    'Input': 'Model.Available(complex={"Name":"Value"})'
  },
  {
    '-Name': 'Functions in commonExpr - complex JSON parameter with whitespace',
    '-Rule': 'commonExpr',
    'Input': 'Model.Available(complex={ "Name" : "double quote (\\") in value" })'
  },
  {
    '-Name': 'Functions in commonExpr - complex JSON parameter with whitespace',
    '-Rule': 'commonExpr',
    'Input': 'Model.Available(complex=%7B %22Name%22 : "double%20quote (%5C%22) in value" %7D)'
  },
  {
    '-Name': 'Functions in commonExpr - property as parameter',
    '-Rule': 'commonExpr',
    'Input': 'Model.PhoneticallySimilar(Word1=Name,Word2=Supplier/Name)'
  },
  {
    '-Name': 'Functions in commonExpr - property as parameter',
    '-Rule': 'commonExpr',
    'Input': 'Model.PhoneticallySimilar(Word1=Name,Word2=Supplier/Name)'
  },
  {
    '-Name': 'Functions in filter - alias as parameter',
    '-Rule': 'queryOptions',
    'Input': '$filter=Model.PhoneticallySimilar(Word=@expression)&@expression=5'
  },
  {
    '-Name': 'Functions in filter - expression as parameter',
    '-Rule': 'queryOptions',
    'Input': '$filter=Model.PhoneticallySimilar(Number=5 add 3)'
  },
  // {
  //   '-Name': 'Functions in filter - $it as prefix',
  //   '-Rule': 'queryOptions',
  //   'Input': '$filter=$it/Model.PhoneticallySimilar(Number=5 add 3)'
  // },
  {
    '-Name': 'Context URL - Entity set',
    '-Rule': 'odataUri',
    'Input': 'http://host/service/$metadata#Customers'
  },
  {
    '-Name': 'Context URL - Entity set with $select',
    '-Rule': 'odataUri',
    'Input': 'http://host/service/$metadata#Customers(Address,Orders)'
  },
  {
    '-Name': 'Context URL - Entity set with $select',
    '-Rule': 'odataUri',
    'Input': 'http://host/service/$metadata#Customers(Address/Street,Orders)'
  },
  {
    '-Name': 'Context URL - Entity set with $select',
    '-Rule': 'odataUri',
    'Input': 'http://host/service/$metadata#Customers(Address/Country)'
  },
  {
    '-Name': 'Context URL - Entity set with $select',
    '-Rule': 'odataUri',
    'Input': 'http://host/service/$metadata#Customers(Address/Model.AddressWithLocation,Orders)'
  },
  {
    '-Name': 'Context URL - Entity set with $select',
    '-Rule': 'odataUri',
    'Input': 'http://host/service/$metadata#Customers(Address/Name,Orders)'
  },
  {
    '-Name': 'Context URL - Entity set with $select',
    '-Rule': 'odataUri',
    'Input': 'http://host/service/$metadata#Customers/Model.VipCustomer(Orders(ID))'
  },
  {
    '-Name': 'Context URL - Entity set with $select and type cast',
    '-Rule': 'odataUri',
    'Input': 'http://host/service/$metadata#Customers(Name,Address/Country,Model.VipCustomer/Rating)'
  },
  {
    '-Name': 'Context URL - Entity set with $select and $expand',
    '-Rule': 'odataUri',
    'Input': 'http://host/service/$metadata#Customers/Model.VipCustomer(Name,Address/Country,Model.*)'
  },
  {
    '-Name': 'Context URL - Entity set with $select and $expand with nested select',
    '-Rule': 'odataUri',
    'Input': 'http://host/service/$metadata#Customers/Model.VipCustomer(Name,Address/Country(Code,Model.ActionName,Model.MostPopularAddress))'
  },
  {
    '-Name': 'Context URL - Entity set with $select and $expand with nested select',
    '-Rule': 'odataUri',
    'Input': 'http://host/service/$metadata#Customers/Model.VipCustomer(Orders,Orders(ID,Items(Price)))'
  },
  {
    '-Name': 'Context URL - Entity with $select and $expand with nested select',
    '-Rule': 'odataUri',
    'Input': 'http://host/service/$metadata#Customers/Model.VipCustomer(*,Orders(ID))/$entity'
  },
  {
    '-Name': 'Context URL - Entity set with cast, $select and recursive $expand',
    '-Rule': 'odataUri',
    'Input': 'http://host/service/$metadata#Employees(Title,DirectReports+(FirstName,LastName))'
  },
  {
    '-Name': 'Context URL - Entity set with type cast',
    '-Rule': 'odataUri',
    'Input': 'http://host/service/$metadata#Customers/Model.VipCustomer'
  },
  {
    '-Name': 'Context URL - Entity',
    '-Rule': 'odataUri',
    'Input': 'http://host/service/$metadata#Customers/$entity'
  },
  {
    '-Name': 'Context URL - Singleton',
    '-Rule': 'odataUri',
    'Input': 'http://host/service/$metadata#SingletonEntity'
  },
  {
    '-Name': 'Context URL - collection with containment',
    '-Rule': 'odataUri',
    'Input': "http://host/service/$metadata#Customers('ALFKI')/Orders"
  },
  {
    '-Name': 'Context URL - containment',
    '-Rule': 'odataUri',
    'Input': "http://host/service/$metadata#Customers('ALFKI')/Orders/$entity"
  },
  {
    '-Name': 'Context URL - collection with containment - multi-level',
    '-Rule': 'odataUri',
    'Input': "http://host/service/$metadata#Customers('ALFKI')/Orders(1)/Items"
  },
  {
    '-Name': 'Context URL - containment - multi-level with $select',
    '-Rule': 'odataUri',
    'Input': "http://host/service/$metadata#Customers('ALFKI')/Orders(1)/Items(Product)/$entity"
  },
  {
    '-Name': 'Context URL - containment with type cast',
    '-Rule': 'odataUri',
    'Input': "http://host/service/$metadata#Customers('ALFKI')/Model.VipCustomer/Address/Orders"
  },
  {
    '-Name': 'Context URL - Entity with $select',
    '-Rule': 'odataUri',
    'Input': 'http://host/service/$metadata#Customers(Address,Orders)/$entity'
  },
  {
    '-Name': 'Context URL - Entity with type cast',
    '-Rule': 'odataUri',
    'Input': 'http://host/service/$metadata#Customers/Model.VipCustomer/$entity'
  },
  {
    '-Name': 'Context URL - Entity property value',
    '-Rule': 'odataUri',
    'Input': 'http://host/service/$metadata#Customers(1)/Addresses'
  },
  {
    '-Name': 'Context URL - Individual value',
    '-Rule': 'odataUri',
    'Input': 'http://host/service/$metadata#Model.MonetaryAmount'
  },
  {
    '-Name': 'Context URL - Individual collection value',
    '-Rule': 'odataUri',
    'Input': 'http://host/service/$metadata#Collection(Edm.String)'
  },
  {
    '-Name': 'Context URL - Reference collection',
    '-Rule': 'odataUri',
    'Input': 'http://host/service/$metadata#Collection($ref)'
  },
  {
    '-Name': 'Context URL - Reference',
    '-Rule': 'odataUri',
    'Input': 'http://host/service/$metadata#$ref'
  },
  {
    '-Name': 'Context URL - $all',
    '-Rule': 'odataUri',
    'Input': 'http://host/service/$metadata#Collection(Edm.EntityType)'
  },
  {
    '-Name': 'Context URL - $crossjoin',
    '-Rule': 'odataUri',
    'Input': 'http://host/service/$metadata#Collection(Edm.ComplexType)'
  },
  {
    '-Name': 'Context URL - Delta',
    '-Rule': 'odataUri',
    'Input': 'http://host/service/$metadata#Customers/$delta'
  },
  {
    '-Name': 'Context URL - Delta - deleted entity',
    '-Rule': 'odataUri',
    'Input': 'http://host/service/$metadata#Orders/$deletedEntity'
  },
  {
    '-Name': 'Context URL - Delta - link',
    '-Rule': 'odataUri',
    'Input': 'http://host/service/$metadata#Customers/$link'
  },
  {
    '-Name': 'Context URL - Delta - deleted link',
    '-Rule': 'odataUri',
    'Input': 'http://host/service/$metadata#Orders/$deletedLink'
  },
  {
    '-Name': 'Query - crossjoin',
    '-Rule': 'odataRelativeUri',
    'Input': "$crossjoin(Customers,Countries)?$expand=Customers($select=Name),Countries($select=Name)&$filter=Customers/CountryCode eq Countries/CountryCode and Countries/Name eq 'USA'"
  },
  {
    '-Name': 'Header - content-id',
    '-Rule': 'header',
    'Input': 'content-id: 1'
  },
  {
    '-Name': 'Header - content-id',
    '-Rule': 'header',
    'Input': 'content-id: First-Insert~Customer_1.1'
  },
  {
    '-Name': 'Header - odata-entitid',
    '-Rule': 'header',
    'Input': 'odata-entityid: ralf:handl'
  },
  {
    '-Name': 'Header - odata-entitid',
    '-Rule': 'header',
    'Input': 'odata-entityID: empty-path:/'
  },
  {
    '-Name': 'Header - odata-entitid',
    '-Rule': 'header',
    'Input': 'odata-entityId:strange:ÿ/'
  },
  {
    '-Name': 'Header - odata-isolation',
    '-Rule': 'header',
    'Input': 'odata-isolation:sNapShoT'
  },
  {
    '-Name': 'Header - odata-maxversion',
    '-Rule': 'header',
    'Input': 'odata-maxversion: 4.0'
  },
  {
    '-Name': 'Header - odata-version',
    '-Rule': 'header',
    'Input': 'odata-version: 4.0'
  },
  {
    '-Name': 'Preferences - allow  entity references',
    '-Rule': 'prefer',
    'Input': 'Prefer: odata.allow-entityreferences,odata.maxpagesize=20'
  },
  {
    '-Name': 'Preferences - callback',
    '-Rule': 'preference',
    'Input': 'odata.callback;url="please://call/me?back#here"'
  },
  {
    '-Name': 'Preferences - callback',
    '-Rule': 'preference',
    'Input': 'odata.callback;url="http://myserver/notfication/token/12345"'
  },
  {
    '-Name': 'Preferences - callback',
    '-Rule': 'preference',
    'Input': 'odata.callback;url="some:where"'
  },
  {
    '-Name': 'Preferences - callback',
    '-Rule': 'preference',
    'Input': 'odata.callback;url="some:/where"'
  },
  {
    '-Name': 'Preferences - continue on error',
    '-Rule': 'preference',
    'Input': 'odata.continue-on-error'
  },
  {
    '-Name': 'Preferences - include annotations - all',
    '-Rule': 'preference',
    'Input': 'odata.include-annotations="*"'
  },
  {
    '-Name': 'Preferences - include annotations - none',
    '-Rule': 'preference',
    'Input': 'odata.include-annotations="-*"'
  },
  {
    '-Name': 'Preferences - include annotations - all in namespace',
    '-Rule': 'preference',
    'Input': 'odata.include-annotations="Namespace.*"'
  },
  {
    '-Name': 'Preferences - include annotations - namespace must be suffixed with .*',
    '-Rule': 'includeAnnotationsPreference',
    '-FailAt': '36',
    'Input': 'odata.include-annotations="Namespace"'
  },
  {
    '-Name': 'Preferences - include annotations - namespace must be suffixed with .*',
    '-Rule': 'includeAnnotationsPreference',
    '-FailAt': '37',
    'Input': 'odata.include-annotations="Namespace."'
  },
  {
    '-Name': 'Preferences - include annotations - nothing from namespace',
    '-Rule': 'preference',
    'Input': 'odata.include-annotations="-Namespace.*"'
  },
  {
    '-Name': 'Preferences - include annotations - only a special term',
    '-Rule': 'preference',
    'Input': 'odata.include-annotations="Namespace.SomeTerm"'
  },
  {
    '-Name': 'Preferences - include annotations - everything except a special term',
    '-Rule': 'preference',
    'Input': 'odata.include-annotations="-Namespace.SomeTerm"'
  },
  {
    '-Name': 'Preferences - include annotations - several',
    '-Rule': 'preference',
    'Input': 'odata.include-annotations="Namespace.SomeTerm,Model.AnotherTerm,Namespace.*"'
  },
  {
    '-Name': 'Preferences - maxpagesize - ok',
    '-Rule': 'preference',
    'Input': 'odata.maxpagesize=50'
  },
  {
    '-Name': 'Preferences - maxpagesize - not zero',
    '-Rule': 'maxpagesizePreference',
    '-FailAt': '18',
    'Input': 'odata.maxpagesize=0'
  },
  {
    '-Name': 'Preferences - maxpagesize - not negative',
    '-Rule': 'maxpagesizePreference',
    '-FailAt': '18',
    'Input': 'odata.maxpagesize=-1'
  },
  {
    '-Name': 'Preferences - return minimal',
    '-Rule': 'preference',
    'Input': 'return=minimal'
  },
  {
    '-Name': 'Preferences - return representation',
    '-Rule': 'preference',
    'Input': 'return=representation'
  },
  {
    '-Name': 'Preferences - respond async',
    '-Rule': 'preference',
    'Input': 'respond-async'
  },
  {
    '-Name': 'Preferences - track changes',
    '-Rule': 'preference',
    'Input': 'odata.track-changes'
  },
  {
    '-Name': 'Preferences - wait',
    '-Rule': 'preference',
    'Input': 'wait=0'
  }
];
