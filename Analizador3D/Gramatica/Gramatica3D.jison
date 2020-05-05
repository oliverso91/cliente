/* lexical grammar */
%lex

%options case-insensitive
identificador   [Ñña-zA-Z_][Ñña-zA-Z0-9_]*
entero '-'([0-9])+|([0-9])+
decimal '-'?([0-9])+'.'([0-9])+
%%
\s+                   /* skip whitespace */
'//'.*                                   //'.*      /* skip comment */
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]   /* IGNORE */
t[0-9]+                 return 'temporal'
L[0-9]+                 return 'etiqueta'
'jmp'                   return 'salto'
'begin'                 return 'begin'
'end'                   return 'end'
'%c'                    return 'cadenaprint'
'%d'                    return 'decimalprint'
'%e'                    return 'enteroprint'
'P'                     return 'punteroStack'
'H'                     return 'punteroHeap'
'heap'                  return 'heap'
'stack'                 return 'stack'
'print'                 return 'imprimir'
'goto'                  return 'goto'
'call'                  return 'call'
'if'                    return 'if'
'proc'                  return 'proc'
{identificador}         return 'identificador'
{decimal}               return 'decimal'
{entero}                return 'entero'
"*"                     return '*'
"/"                     return '/'
"-"                     return '-'
"+"                     return '+'
"%"                     return '%'
":"                     return ':'
"<="                    return '<='
">="                    return '>='
"=="                    return '=='
"<"                     return '<'
">"                     return '>'
"!="                    return '!='
","                     return ','
"="                     return '='
"("                     return '('
")"                     return ')'
"["                     return '['
"]"                     return ']'
<<EOF>>                 return 'EOF'
.                       return 'INVALID'

/lex

%start INICIO

%% /* language grammar */

INICIO : ELEMENTOS EOF {return new AST3D($1);}
        ;

ELEMENTOS : ELEMENTOS ELEMENTO {
                                    if($2 instanceof Metodo3D){
                                            $$ = $1; $$ = $$.concat($2.instruccionesMetodo);
                                    }else{
                                            $$ = $1; $$.push($2);
                                    }
                                }
          | ELEMENTO {
                        if($1 instanceof Metodo3D){
                                $$ = $1.instruccionesMetodo;;
                        }else{
                                $$ = [$1];
                        }
                     }
          ;
           
ELEMENTO : INSTRUCCION {$$ = $1;}
         | METODO {$$ = $1;}
         ;

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION {$$ = $1; $$.push($2);}
              | INSTRUCCION {$$ = [$1];}
              ;

INSTRUCCION : SALTOS {$$ = $1;}
            | ASIGNACION {$$ = $1;}
            | LLAMADA {$$ = $1;}
            | PRINT {$$ = $1;}
            | OPERACION {$$ = $1;}
            | ETIQUETA {$$ = $1;}
            ;

SALTOS : CONDICIONAL {$$ = $1;}
       | INCONDICIONAL {$$ = $1;}
       ;

CONDICIONAL : if '(' VALOR TIPOSALTO VALOR ')' goto etiqueta {$$ = new SaltoCondicional($4, $3, $5, $8, this._$.first_line, this._$.first_column);} 
            ;

INCONDICIONAL : goto etiqueta {$$ = new SaltoIncondicional($2, this._$.first_line, this._$.first_column);} 
            ;

ETIQUETA : etiqueta ':' {$$ = new Etiqueta($1, this._$.first_line, this._$.first_column);}
         ;

ASIGNACION : ESTRUCTURA '[' VALOR ']' '=' VALOR {$$ = new AsignacionEstructura($3, $6, $1, this._$.first_line, this._$.first_column);} // HEAP[VALOR1] = VALOR2
           | VARIABLE '=' VALOR {$$ = new Asignacion3D($1, $3, this._$.first_line, this._$.first_column);} // VALOR2 = VALOR1
           | VARIABLE '=' ESTRUCTURA '[' VALOR ']'{$$ = new  AccesoEstructura($3, $5, $1, this._$.first_line, this._$.first_column);} // VALOR2 = HEAP[VALOR1]
           ;

METODO : proc identificador begin INSTRUCCIONES end {$$ = new Metodo3D($2, $4, this._$.first_line, this._$.first_column);}
       | proc identificador begin end {$$ = new Metodo3D($2, [], this._$.first_line, this._$.first_column);}
       ;

LLAMADA : call identificador {$$ = new Llamada3D($2, this._$.first_line, this._$.first_column);}    
        ;

PRINT : imprimir '(' PARAMETROPRINT ',' VALOR ')' {$$ = new Print3D($3, $5, this._$.first_line, this._$.first_column);}  
      ;

PARAMETROPRINT : cadenaprint {$$ = $1;}
               | enteroprint  {$$ = $1;}
               | decimalprint {$$ = $1;}
               ;

ESTRUCTURA : stack {$$ = $1;}
           | heap {$$ = $1;}
           ;

TIPOSALTO : '<=' {$$ = $1;}
          | '>=' {$$ = $1;}
          | '<' {$$ = $1;}
          | '>' {$$ = $1;}
          | '==' {$$ = $1;}
          | '!=' {$$ = $1;}
          ;

VALOR : entero {$$ = new Primitivo3D(Number($1), this._$.first_line, this._$.first_column);}
      | decimal {$$ = new Primitivo3D(Number($1), this._$.first_line, this._$.first_column);}
      | VARIABLE {$$ = $1;}
      ;

VARIABLE : temporal {$$ = new Identificador3D($1, this._$.first_line, this._$.first_column);}
         | punteroHeap {$$ = new Identificador3D($1, this._$.first_line, this._$.first_column);}
         | punteroStack {$$ = new Identificador3D($1, this._$.first_line, this._$.first_column);}
         ;
 
OPERACION : VARIABLE '=' VALOR '+' VALOR {$$ = new Operacion3D($4, $3, $5, $1, this._$.first_line, this._$.first_column);} 
          | VARIABLE '=' VALOR '-' VALOR {$$ = new Operacion3D($4, $3, $5, $1, this._$.first_line, this._$.first_column);} 
          | VARIABLE '=' VALOR '*' VALOR {$$ = new Operacion3D($4, $3, $5, $1, this._$.first_line, this._$.first_column);} 
          | VARIABLE '=' VALOR '/' VALOR {$$ = new Operacion3D($4, $3, $5, $1, this._$.first_line, this._$.first_column);} 
          | VARIABLE '=' VALOR '%' VALOR {$$ = new Operacion3D($4, $3, $5, $1, this._$.first_line, this._$.first_column);}  
          ;
