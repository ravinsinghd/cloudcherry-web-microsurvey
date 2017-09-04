class DomUtilities{

  sbcRip : any;

  constructor(){
    // HTMLElement.prototype.matches = HTMLElement.prototype.matches ||
    // HTMLElement.prototype.matchesSelector ||
    // HTMLElement.prototype.webkitMatchesSelector ||
    // HTMLElement.prototype.mozMatchesSelector ||
    // HTMLElement.prototype.msMatchesSelector ||
    // HTMLElement.prototype.oMatchesSelector;
  }


   appendStyle(css : string) : void {
		let head : any = document.head || document.getElementsByTagName('head')[0];
    let style : any = document.createElement('style');
		style.type = 'text/css';
		if (style.styleSheet){
		  style.styleSheet.cssText = css;
		} else {
		  style.appendChild(document.createTextNode(css));
		}
		head.appendChild(style);
	}

	removeClassAll(elements : any, className : string) : void {
		Array.prototype.forEach.call(elements, (el, i) => {
			this.removeClass(el,className);
		});
	}

	addClassAll(elements : any, className : string) : void {
		Array.prototype.forEach.call(elements, (el, i) => {
			this.addClass(el,className);
		});
	}

	removeClass(el : any, className : string) : void{
    // console.log(el);
		if (el.classList)
		  el.classList.remove(className);
		else
		  el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
	}
	addClass(el : any, className : string){
		if (el.classList)
		  el.classList.add(className);
		else
		  el.className += ' ' + className;
	}
	toggleClass(el : any, className : string) : void {
		if (el.classList){
			if(el.classList.contains(className))
				el.classList.remove(className);
			else
				el.classList.add(className);
		}


	}
	ready(fn : any) : void {
	  if ((<any>document).attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
	    fn();
	  } else {
	    document.addEventListener('DOMContentLoaded', fn);
	  }
	}

	getParents(el : any, parentSelector : any) : any {
    // If no parentSelector defined will bubble up all the way to *document*
    if (parentSelector === undefined) {
        parentSelector = document;
    }

    var parents = [];
    var p = el.parentNode;

    while (p !== parentSelector) {
        var o = p;
        parents.push(o);
        p = o.parentNode;
    }
    parents.push(parentSelector); // Push that parentSelector you wanted to stop at

    return parents;
	}

	listner(el : any, evt : any, sel : any, handler : any) : void {
    el.addEventListener(evt, function(event) {
        var t = event.target;
        while (t && t !== this) {
            if (t.matches(sel)) {
                handler.call(t, event);
            }
            t = t.parentNode;
        }
    });
  }

   shadeBlendConvert(p : number, from : any, to : string) : string {
	    if(typeof(p)!="number"||p<-1||p>1||typeof(from)!="string"||(from[0]!='r'&&from[0]!='#')||(typeof(to)!="string"&&typeof(to)!="undefined"))return null; //ErrorCheck
	    if(!this.sbcRip)this.sbcRip=function(d){
	        var l=d.length,RGB=new Object();
	        if(l>9){
	            d=d.split(",");
	            if(d.length<3||d.length>4)return null;//ErrorCheck
	            RGB[0]=i(d[0].slice(4)),RGB[1]=i(d[1]),RGB[2]=i(d[2]),RGB[3]=d[3]?parseFloat(d[3]):-1;
	        }else{
	            if(l==8||l==6||l<4)return null; //ErrorCheck
	            if(l<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(l>4?d[4]+""+d[4]:""); //3 digit
	            d=i(d.slice(1),16),RGB[0]=d>>16&255,RGB[1]=d>>8&255,RGB[2]=d&255,RGB[3]=l==9||l==5?r(((d>>24&255)/255)*10000)/10000:-1;
	        }
	        return RGB;}
	    var i=parseInt,r=Math.round,h=from.length>9,h=typeof(to)=="string"?to.length>9?true:to=="c"?!h:false:h,b=p<0,p=b?p*-1:p,to=to&&to!="c"?to:b?"#000000":"#FFFFFF",f=this.sbcRip(from),t=this.sbcRip(to);
	    if(!f||!t)return null; //ErrorCheck
	    if(h)return "rgb("+r((t[0]-f[0])*p+f[0])+","+r((t[1]-f[1])*p+f[1])+","+r((t[2]-f[2])*p+f[2])+(f[3]<0&&t[3]<0?")":","+(f[3]>-1&&t[3]>-1?r(((t[3]-f[3])*p+f[3])*10000)/10000:t[3]<0?f[3]:t[3])+")");
	    else return "#"+(0x100000000+(f[3]>-1&&t[3]>-1?r(((t[3]-f[3])*p+f[3])*255):t[3]>-1?r(t[3]*255):f[3]>-1?r(f[3]*255):255)*0x1000000+r((t[0]-f[0])*p+f[0])*0x10000+r((t[1]-f[1])*p+f[1])*0x100+r((t[2]-f[2])*p+f[2])).toString(16).slice(f[3]>-1||t[3]>-1?1:3);
	}

   hexToRGB(hex : string, alpha : any) : string {
	    if (!hex || [4, 7].indexOf(hex.length) === -1) {
	        return; // throw new Error('Bad Hex');
	    }

	    hex = hex.substr(1);
	    // if shortcuts (#F00) -> set to normal (#FF0000)
	    if (hex.length === 3) {
	        hex = hex.split('').map(function(el){
	              return el + el + '';
	            }).join('');
	    }

	    var r = parseInt(hex.slice(0, 2), 16),
	        g = parseInt(hex.slice(2, 4), 16),
	        b = parseInt(hex.slice(4, 6), 16);

	    if (alpha) {
	        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
	    } else {
	        return "rgb(" + r + ", " + g + ", " + b + ")";
	    }
	}



}



export { DomUtilities };