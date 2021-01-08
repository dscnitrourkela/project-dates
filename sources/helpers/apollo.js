const responseResolver=(name)=>{
    return {
		__resolveType: (obj) => {
			return obj.__typename == 'ErrorClass' ? 'ErrorClass' : name;
		},
	}
}

module.exports={
    responseResolver
}