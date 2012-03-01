

/**
 * @name myspace
 * @namespace
 */
var myspace={};

/**
 * My first class constractor,
 * (中文测试GBK)
 * @author bruce.li
 * @param {Object} options The function parameters.
 * @constructor
 * @example 
 *    HTML:
 *      &lt;div id="destId"&gt;Test&lt;/div&gt;
 *      
 *    javascript:
 *      var  clazz = new myspace.TesterClass({id:"destId"})
 *        clazz.foo();
 */
myspace.TesterClass = function(options){
	this.init(options);
	
};


myspace.TesterClass.prototype={
		
		
		/**
		 * The property field 1.
		 * @type Number
		 */
		Prop_1:1,
		
		/**
		 * The property field 2.
		 * @default {String} "string"
		 * @type String
		 */
		Prop_2:"string",
		
		/**
		 * initialize function.
		 * (not define public or private)
		 * @param {Obejct} options (optional)
		 */
		init:function(options){
			var config = {
			   /** @scope myspace.TesterClass# */
										
				/**
				 * 构造函数选项一
				 * @cfg
				 */	
				option1:"cfg1",
				
				/**
				 * 构造函数选项二
				 * @cfg
				 */	
				option2:1235,
				
				/**
				 * 构造函数可选选项
				 * @optional
				 * @cfg
				 */	
				optionOpt:[],
			
				/**
				 * 构造函数必须选项
				 * @required
				 * @cfg
				 */	
				optionReq:null
			};
			
			/*do something...*/
		},
		
		

		/**
		 * 测试 parameter type 2
		 */
		foo:function(/**String*/arg0,/**String*/arg1,/**myspace.TesterClass*/arg2){
			
		},
		
		
		/**
		 * Private method will not be document.
		 * @private
		 * @param {Object} args The method parameters.
		 */
		privateMethod:function(args){
			
		},
		
		/**
		 * Public method
		 * @public
		 * @param {Object} arg0
		 * @config {String} prop_1 The sub property within arg0.
		 * @config {Number} [prop_2]
		 * @config {TestFun} [prop_3]
		 * @config {String} [prop_4]
		 * @param {Object} arg1 The sub property within arg1.
		 * @config {String} prop_1
		 * @config {Number} [prop_2]
		 * @returns {TestFun} The <code>TestFun<code> object.
		 */
		publicMethod:function(arg0,arg1){
			return new TestFun({});
		}
		
};



/**
 * Abstract document method (public method)
 * @name myDocMethod
 * @public
 * @function
 * @param {Object} [args]
 * @memberOf myspace.TesterClass#
 */


/**
 * Abstract document method (static method)
 * @name myDocMethod2
 * @public
 * @function
 * @param {Object} args
 * @memberOf myspace.TesterClass
 */



/**
 *Static method
 *@static
 *@param {Object} args The parameters
 */
myspace.TesterClass.staticMethod=function(args){
  
};


/**
 * @author bruce.li
 * @constructor
 * @param {Object} options
 * @extends myspace.TesterClass
 */
myspace.MyClass= function(options){};

myspace.MyClass.prototype={
		/**@scope myspace.MyClass# */
		
		/**
		 * overwrite test
		 * @deprecated  Deprecated since 1.0
		 * @public
		 */
		publicMethod:function(arg0,arg1){}
};
		


/**
 * @author bruce.li
 * @class ExtendsClass
 * @param {Object} options
 * @extends myspace.MyClass
 */
ExtendsClass = function(options){};

ExtendsClass.prototype={
	/**@scope ExtendsClass# */
		 
		
		/**
		 *new method
		 * @public
		 * @throws {Error} 抛出例外注释
		 */
		extendMethod:function(){			
			throw new Error("not exist!");		
		}
};